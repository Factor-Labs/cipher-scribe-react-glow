import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Unlock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CryptoJS from "crypto-js";

export const DecryptionPanel = () => {
  const [passphrase, setPassphrase] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [plainText, setPlainText] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleDecrypt = async () => {
    if (!passphrase.trim() || !cipherText.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both passphrase and cipher text to decrypt.",
        variant: "destructive",
      });
      return;
    }

    setIsDecrypting(true);
    
    try {
      // Simulate decryption delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const decrypted = CryptoJS.AES.decrypt(cipherText, passphrase);
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedText) {
        throw new Error("Invalid passphrase or corrupted cipher text");
      }
      
      setPlainText(decryptedText);
      
      toast({
        title: "Decryption Successful",
        description: "Your text has been decrypted successfully.",
      });
    } catch (error) {
      toast({
        title: "Decryption Failed",
        description: "Invalid passphrase or corrupted cipher text.",
        variant: "destructive",
      });
      setPlainText("");
    } finally {
      setIsDecrypting(false);
    }
  };

  const handleCopy = async () => {
    if (!plainText) return;
    
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Decrypted text copied to clipboard.",
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
          <Unlock className="h-5 w-5 text-primary" />
          Decrypt Text
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="decrypt-passphrase" className="text-sm font-medium text-foreground">
            Passphrase
          </Label>
          <Input
            id="decrypt-passphrase"
            type="password"
            placeholder="Enter your secret passphrase"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="bg-input/60 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-200"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cipher-text" className="text-sm font-medium text-foreground">
            Cipher Text to Decrypt
          </Label>
          <Textarea
            id="cipher-text"
            placeholder="Paste the encrypted text here..."
            value={cipherText}
            onChange={(e) => setCipherText(e.target.value)}
            className="min-h-[120px] bg-input/60 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-200 resize-none font-mono text-xs"
          />
        </div>
        
        <Button 
          onClick={handleDecrypt}
          disabled={isDecrypting || !passphrase.trim() || !cipherText.trim()}
          className="w-full"
        >
          {isDecrypting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Decrypting...
            </>
          ) : (
            <>
              <Unlock className="h-4 w-4" />
              Decrypt Text
            </>
          )}
        </Button>
        
        {plainText && (
          <div className="space-y-2 animate-scale-in">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">Decrypted Text</Label>
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
              value={plainText}
              readOnly
              className="min-h-[120px] bg-muted/60 backdrop-blur-sm border-border/50 resize-none"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};