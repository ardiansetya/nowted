import { Calendar, FileText, Search, Star } from "lucide-react";

const LandingPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
    {/* Hero Section */}
    <div className="container mx-auto px-6 py-16">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Capture Your Ideas,
            <br />
            <span className="text-primary">Organize Your Life</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Simple, powerful note-taking that syncs across all your devices.
            Never lose a thought again with our intelligent organization system.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Get Started Free
          </button>
          <button className="px-8 py-4 bg-card text-card-foreground border border-border rounded-xl font-semibold hover:bg-accent transition-all duration-200">
            Watch Demo
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-primary/20 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-3">
              Smart Search
            </h3>
            <p className="text-muted-foreground">
              Find any note instantly with our powerful search that understands
              context and content.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-primary/20 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-3">
              Smart Organization
            </h3>
            <p className="text-muted-foreground">
              Automatic tagging and categorization keeps your notes perfectly
              organized without effort.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-primary/20 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-3">
              Never Forget
            </h3>
            <p className="text-muted-foreground">
              Set reminders and track important dates so your notes work for
              you, not against you.
            </p>
          </div>
        </div>

        {/* Call to Action
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 border border-primary/20">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to get organized?
          </h2>
          <p className="text-muted-foreground mb-6">
            {
              "Take your notes with you anywhere, on any device, and access them from any device with an internet connection."
            }
          </p>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl">
            Start Taking Notes
          </button>
        </div> */}
      </div>
    </div>
  </div>
);

export default LandingPage;