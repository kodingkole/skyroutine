const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;
const SYNC_FILE = path.join(ROOT, 'sync-data.json');

function readSyncStore() {
    try { return JSON.parse(fs.readFileSync(SYNC_FILE, 'utf8')); }
    catch (_) { return {}; }
}

function writeSyncStore(store) {
    fs.writeFileSync(SYNC_FILE, JSON.stringify(store, null, 2), 'utf8');
}

function syncKey(code) {
    return crypto.createHash('sha256').update(code).digest('hex');
}

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let safeUrl = decodeURIComponent(req.url.split('?')[0]);
    if (safeUrl.startsWith('/api/sync/')) {
        const code = safeUrl.slice('/api/sync/'.length).trim();
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
        if (!/^[A-Za-z0-9_-]{8,64}$/.test(code)) {
            res.writeHead(400); res.end(JSON.stringify({ error: 'Sync code must be 8-64 letters/numbers.' })); return;
        }
        const store = readSyncStore();
        const key = syncKey(code);
        if (req.method === 'GET') {
            if (!store[key]) { res.writeHead(404); res.end(JSON.stringify({ error: 'No synced data yet.' })); return; }
            res.writeHead(200); res.end(JSON.stringify(store[key])); return;
        }
        if (req.method === 'PUT') {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
                if (body.length > 2_000_000) req.destroy();
            });
            req.on('end', () => {
                try {
                    const payload = JSON.parse(body);
                    if (!payload || typeof payload.state !== 'object') throw new Error('Invalid state');
                    store[key] = { state: payload.state, updatedAt: Number(payload.updatedAt) || Date.now() };
                    writeSyncStore(store);
                    res.writeHead(200); res.end(JSON.stringify({ ok: true, updatedAt: store[key].updatedAt }));
                } catch (error) {
                    res.writeHead(400); res.end(JSON.stringify({ error: error.message }));
                }
            });
            return;
        }
        res.writeHead(405); res.end(JSON.stringify({ error: 'Method not allowed.' })); return;
    }
    if (safeUrl === '/') safeUrl = '/index.html';
    
    let filePath = path.join(ROOT, safeUrl);

    // Prevent directory traversal
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const mime = MIME_TYPES[ext] || 'application/octet-stream';
        
        res.writeHead(200, {
            'Content-Type': mime,
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache'
        });
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`SkyRoutine web server successfully running at http://localhost:${PORT}/`);
});
