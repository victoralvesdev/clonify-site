
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Change page title
    document.title = 'Página Não Encontrada - PhantomAds';
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-phantom-black px-6">
      <div className="text-center max-w-md glass-card p-8 rounded-xl">
        <h1 className="text-5xl font-bold mb-2 phantom-gradient-text">404</h1>
        <p className="text-xl text-white/80 mb-6">Oops! Página não encontrada</p>
        <p className="text-white/60 mb-8">
          A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 btn-phantom"
        >
          <ArrowLeft size={18} />
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
