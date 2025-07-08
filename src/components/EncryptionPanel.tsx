import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Lock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CryptoJS from "crypto-js";

export const EncryptionPanel = () => {
  const [passphrase, setPassphrase] = useState("");
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleEncrypt = async () => {
    if (!passphrase.trim() || !plainText.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both passphrase and text to encrypt.",
        variant: "destructive",
      });
      return;
    }

    setIsEncrypting(true);
    
    try {
      // Simulate encryption delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate random salt for PBKDF2
      const salt = CryptoJS.lib.WordArray.random(256/8);
      
      // Derive key using PBKDF2 with 100,000 iterations
      const key = CryptoJS.PBKDF2(passphrase, salt, {
        keySize: 256/32,
        iterations: 100000
      });
      
      // Encrypt the text
      const encrypted = CryptoJS.AES.encrypt(plainText, key, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      
      // Combine salt and encrypted data
      const result = {
        salt: salt.toString(),
        encrypted: encrypted.toString()
      };
      
      setCipherText(JSON.stringify(result));
      
      toast({
        title: "Encryption Successful",
        description: "Your text has been encrypted securely with PBKDF2.",
      });
    } catch (error) {
      toast({
        title: "Encryption Failed",
        description: "An error occurred during encryption.",
        variant: "destructive",
      });
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleCopy = async () => {
    if (!cipherText) return;
    
    try {
      await navigator.clipboard.writeText(cipherText);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Cipher text copied to clipboard.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="h-full bg-gradient-card backdrop-blur-sm border-border/50 shadow-card animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lock className="h-5 w-5 text-primary" />
          Encrypt Text
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="encrypt-passphrase" className="text-sm font-medium text-foreground">
            Passphrase
          </Label>
          <Input
            id="encrypt-passphrase"
            type="password"
            placeholder="Enter your secret passphrase"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="bg-input/60 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-200"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="plain-text" className="text-sm font-medium text-foreground">
            Text to Encrypt
          </Label>
          <Textarea
            id="plain-text"
            placeholder="Enter the text you want to encrypt..."
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            className="min-h-[120px] bg-input/60 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-200 resize-none"
          />
        </div>
        
        <Button 
          onClick={handleEncrypt}
          disabled={isEncrypting || !passphrase.trim() || !plainText.trim()}
          className="w-full"
        >
          {isEncrypting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Encrypting...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Encrypt Text
            </>
          )}
        </Button>
        
        {cipherText && (
          <div className="space-y-2 animate-scale-in">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">Encrypted Text</Label>
              <Button
                variant="copy"
                size="sm"
                onClick={handleCopy}
                className={copied ? "animate-success-pulse" : ""}
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <Textarea
              value={cipherText}
              readOnly
              className="min-h-[120px] bg-muted/60 backdrop-blur-sm border-border/50 font-mono text-xs resize-none"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};