// load-env.js
const loadEnv = async () => {
    const response = await fetch('./.env');
    const text = await response.text();
    const lines = text.split('\n');
    lines.forEach(line => {
        const [key, value] = line.split('=');
        window.env[key.trim()] = value.trim();
    });

    // Usa window.env en lugar de process.env
    window.env[key.trim()] = value.trim();
};

loadEnv();
