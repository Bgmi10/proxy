let stats = {
    active: 0,
    failed: 0,
    retries: 0,
    success: 0,
    totalStarted: 0
  };
  
  export function getStats() {
    const total = stats.success + stats.failed;
  
    const successRate =
      total === 0 ? 0 : ((stats.success / total) * 100).toFixed(2);
  
    return {
      ...stats,
      successRate
    };
  }
  
  const proxies = [
    { ip: "proxy1", failRate: 0.2 },
    { ip: "proxy2", failRate: 0.5 },
    { ip: "proxy3", failRate: 0.8 }
  ];
  
  export function getRandomProxy() {
    return proxies[Math.floor(Math.random() * proxies.length)];
  }
  
  export async function startSessions(count) {
    for (let i = 0; i < count; i++) {
      runSession();
    }
  }
  
  export async function createConnection(proxy) {
    return new Promise((resolve, reject) => {
      const success = Math.random() > proxy.failRate;
  
      setTimeout(() => {
        if (success) resolve();
        else reject(new Error("Connection failed"));
      }, 500);
    });
  }
  
  async function runSession() {
    stats.totalStarted++;  // ✅ track total
  
    const proxy = getRandomProxy();
  
    try {
      await createConnection(proxy);
  
      stats.active++;
      stats.success++;   // ✅ success tracking
  
      setTimeout(() => {
        stats.active--;
        runSession();
      }, 3000);
  
    } catch {
      stats.failed++;
      stats.retries++;
  
      setTimeout(runSession, 1000);
    }
  }