export function generateBackupCode() {
    const codeLength = 10;
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let backupCode = "";
  
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      backupCode += chars.charAt(randomIndex);
    }
    return backupCode;
  }
  
  export function generateSecretKey() {
    let secretKey = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    for (let i = 0; i < 10; i++) {
      secretKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return secretKey;
  }
  