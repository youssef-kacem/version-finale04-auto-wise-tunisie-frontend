import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simuler un délai d'envoi d'email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dans une vraie application, vous appelleriez ici votre API pour gérer la réinitialisation
      // await resetPassword(email);
      
      setIsEmailSent(true);
      toast({
        title: "Email envoyé",
        description: "Les instructions de réinitialisation ont été envoyées à votre adresse email.",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <img 
                src="/lovable-uploads/43daed69-9290-490b-99c3-7d35f12ec6d5.png" 
                alt="AutoWise" 
                className="h-10 mx-auto mb-4" 
              />
              <h1 className="text-2xl font-bold text-autowise-navy">
                Mot de passe oublié
              </h1>
              <p className="text-gray-600 mt-1">
                Entrez votre email pour réinitialiser votre mot de passe
              </p>
            </div>

            {isEmailSent ? (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <AlertCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Email envoyé</AlertTitle>
                <AlertDescription className="text-green-700">
                  Veuillez vérifier votre boîte de réception et suivre les instructions pour réinitialiser votre mot de passe.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-autowise-blue hover:bg-autowise-navy"
                  disabled={isLoading}
                >
                  {isLoading ? "Envoi en cours..." : "Envoyer les instructions"}
                </Button>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    Retourner à la{" "}
                    <Link to="/login" className="text-autowise-blue hover:underline">
                      page de connexion
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 