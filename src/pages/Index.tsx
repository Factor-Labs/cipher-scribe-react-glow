import { EncryptionPanel } from "@/components/EncryptionPanel";
import { DecryptionPanel } from "@/components/DecryptionPanel";
import { Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
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

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p>⚡ Powered by AES + PBKDF2 • 🔒 Your data never leaves your browser • 🚀 100,000 iterations for maximum security</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
