/* ================================================================
   OSTP API v2.0
   ================================================================ */
const OSTP_API = {
    webhookUrl: 'REEMPLAZAR_CON_WEBHOOK_REAL',
    debugMode: true,
    sendContact: async (data) => {
        const payload = { type: 'contacto', source: window.location.href, timestamp: new Date().toISOString(), userAgent: navigator.userAgent, data: data };
        return OSTP_API._send(payload);
    },
    sendFunnel: async (data) => {
        const payload = { type: 'diagnostico', source: window.location.href, timestamp: new Date().toISOString(), userAgent: navigator.userAgent, data: data };
        return OSTP_API._send(payload);
    },
    sendBooking: async (data) => {
        const payload = { type: 'agendamiento', source: window.location.href, timestamp: new Date().toISOString(), userAgent: navigator.userAgent, data: data };
        return OSTP_API._send(payload);
    },
    _send: async (payload) => {
        try {
            if (OSTP_API.debugMode) {
                console.log('[OSTP API] Payload:', payload);
                const leads = JSON.parse(localStorage.getItem('ostp_leads') || '[]');
                leads.push(payload); localStorage.setItem('ostp_leads', JSON.stringify(leads));
            }
            const response = await fetch(OSTP_API.webhookUrl, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) return { success: true };
            else throw new Error('HTTP ' + response.status);
        } catch (error) {
            console.warn('[OSTP API] Webhook fallback:', error);
            const queue = JSON.parse(localStorage.getItem('ostp_queue') || '[]');
            queue.push(payload); localStorage.setItem('ostp_queue', JSON.stringify(queue));
            return { success: true, localOnly: true };
        }
    },
    retryPending: async () => {
        const queue = JSON.parse(localStorage.getItem('ostp_queue') || '[]');
        if (queue.length === 0) return;
        for (let i = 0; i < queue.length; i++) {
            const result = await OSTP_API._send(queue[i]);
            if (result.success && !result.localOnly) { queue.splice(i, 1); i--; }
        }
        localStorage.setItem('ostp_queue', JSON.stringify(queue));
    },
    exportLeads: () => {
        const leads = localStorage.getItem('ostp_leads');
        const queue = localStorage.getItem('ostp_queue');
        const data = { leads: JSON.parse(leads || '[]'), queue: JSON.parse(queue || '[]'), exportDate: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `ostp_leads_${Date.now()}.json`; a.click();
        URL.revokeObjectURL(url);
    }
};
document.addEventListener('DOMContentLoaded', () => { OSTP_API.retryPending(); });
window.OSTP_API = OSTP_API;
OSTP_API.submitFunnel = OSTP_API.submitFunnel || function(data){console.log('[OSTP_API] submitFunnel',data);return Promise.resolve({ok:true,redirect:'form.html?dim='+(data?.dim||'00')});};
OSTP_API.submitContact = OSTP_API.submitContact || function(data){console.log('[OSTP_API] submitContact',data);return Promise.resolve({ok:true});};
OSTP_API.processPayment = OSTP_API.processPayment || function(data){console.log('[OSTP_API] processPayment',data);return Promise.resolve({ok:true,redirect:'gracias.html'});};