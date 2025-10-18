import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Info } from "lucide-react";
import Navbar from "@/components/Navbar";

const Home = () => {
  const trendingContent = [
    { id: 1, title: "The Crown", genre: "Drama", rating: "9.2" },
    { id: 2, title: "Stranger Things", genre: "Sci-Fi", rating: "8.9" },
    { id: 3, title: "The Witcher", genre: "Fantasy", rating: "8.5" },
    { id: 4, title: "Breaking Bad", genre: "Crime", rating: "9.5" },
    { id: 5, title: "Game of Thrones", genre: "Fantasy", rating: "9.1" },
    { id: 6, title: "The Mandalorian", genre: "Sci-Fi", rating: "8.7" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 gradient-hero opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
              Unlimited Entertainment
            </h1>
            <p className="text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Watch your favorite movies, shows, and live sports. Anytime, anywhere.
            </p>
            <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <Button size="lg" className="gap-2 shadow-glow">
                <Play className="h-5 w-5" />
                Watch Now
              </Button>
              <Button size="lg" variant="secondary" className="gap-2">
                <Info className="h-5 w-5" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Content */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
          Trending Now
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingContent.map((item, index) => (
            <Card 
              key={item.id}
              className="group relative overflow-hidden cursor-pointer transition-smooth hover:scale-105 hover:shadow-glow border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                <Play className="h-16 w-16 text-primary opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-smooth" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-smooth">{item.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{item.genre}</span>
                  <span className="flex items-center gap-1">
                    ⭐ {item.rating}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Watch Anywhere", desc: "Stream on any device, anytime" },
            { title: "No Ads", desc: "Enjoy uninterrupted entertainment" },
            { title: "HD Quality", desc: "Crystal clear 4K streaming" },
          ].map((feature, index) => (
            <Card 
              key={index}
              className="p-8 text-center glass-effect border-border/50 transition-smooth hover:border-primary/50 animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
