import { EncryptionPanel } from "@/components/EncryptionPanel";
import { DecryptionPanel } from "@/components/DecryptionPanel";
import { Shield, Github } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* GitHub Link */}
        <div className="flex justify-end mb-4 animate-fade-in">
          <a
            href="https://github.com/Factor-Labs/cipher-scribe-react-glow"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:bg-card/80 transition-all duration-200 hover:shadow-glow"
            aria-label="View source code on GitHub"
          >
            <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SafeShare
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Secure text encryption and decryption with PBKDF2 key derivation. Share sensitive information with military-grade security.
          </p>
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-blue-600 dark:text-blue-400 text-center">
              💡 <strong>Tip:</strong> Share the passphrase once per recipient to share multiple encrypted messages.
            </p>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <EncryptionPanel />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <DecryptionPanel />
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 md:p-8 shadow-glow">
            <h2 className="text-2xl font-semibold text-center mb-6 bg-gradient-primary bg-clip-text text-transparent">
              How to Use SafeShare
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Encryption
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Enter your sensitive text in the left panel</li>
                  <li>• Create a strong password (8+ characters recommended)</li>
                  <li>• Click "Encrypt Text" to generate encrypted data</li>
                  <li>• Share the encrypted text and password separately</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Decryption
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Paste the encrypted text in the right panel</li>
                  <li>• Enter the exact password used for encryption</li>
                  <li>• Click "Decrypt Text" to reveal the original message</li>
                  <li>• Copy the decrypted text when ready</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-sm text-amber-600 dark:text-amber-400">
                <strong>Security Note:</strong> Always share encrypted text and passwords through different channels for maximum security. 
                The passphrase can be shared once per recipient via a secure channel, then multiple encrypted messages can be sent using the same passphrase.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p>⚡ Powered by AES + PBKDF2 • 🔒 Your data never leaves your browser • 🚀 100,000 iterations for maximum security</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
