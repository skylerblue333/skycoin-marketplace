import crypto from 'crypto';

export class MilitaryGradeEncryption {
  private algorithm = 'aes-256-gcm';
  private keyLength = 32;
  private ivLength = 16;
  private tagLength = 16;

  generateKey(): Buffer {
    return crypto.randomBytes(this.keyLength);
  }

  encrypt(data: string, key: Buffer) {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    return { iv: iv.toString('hex'), encrypted, authTag: authTag.toString('hex') };
  }

  decrypt(encrypted: any, key: Buffer): string {
    const decipher = crypto.createDecipheriv(this.algorithm, key, Buffer.from(encrypted.iv, 'hex'));
    decipher.setAuthTag(Buffer.from(encrypted.authTag, 'hex'));
    let decrypted = decipher.update(encrypted.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
