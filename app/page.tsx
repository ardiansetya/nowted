"use client"

import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  FileText,
  Star,
  Trash2,
  Edit3,
  Calendar,
  Filter,
} from "lucide-react";

// Mock data untuk notes
const mockNotes = [
  {
    id: 1,
    title: "Meeting Notes - Q4 Planning",
    content:
      "Discussed quarterly objectives, budget allocation, and team restructuring...",
    createdAt: "2024-01-15",
    isStarred: true,
    tags: ["work", "meeting"],
  },
  {
    id: 2,
    title: "Shopping List",
    content: "Milk, Bread, Eggs, Tomatoes, Rice, Chicken breast...",
    createdAt: "2024-01-14",
    isStarred: false,
    tags: ["personal", "shopping"],
  },
  {
    id: 3,
    title: "Book Ideas",
    content:
      "1. Time travel mystery 2. AI consciousness thriller 3. Environmental dystopia...",
    createdAt: "2024-01-13",
    isStarred: true,
    tags: ["creative", "writing"],
  },
  {
    id: 4,
    title: "Travel Itinerary - Bali",
    content:
      "Day 1: Arrival in Denpasar, check-in hotel Day 2: Ubud rice terraces...",
    createdAt: "2024-01-12",
    isStarred: false,
    tags: ["travel", "personal"],
  },
];

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set ke true untuk test logged in state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [notes, setNotes] = useState(mockNotes);

  // Filter notes berdasarkan search dan filter
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "starred" && note.isStarred) ||
      note.tags.includes(selectedFilter);

    return matchesSearch && matchesFilter;
  });

  const toggleStar = (noteId) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId ? { ...note, isStarred: !note.isStarred } : note
      )
    );
  };

  // Landing page untuk user yang belum login
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
              Never lose a thought again with our intelligent organization
              system.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => setIsLoggedIn(true)}
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
                Find any note instantly with our powerful search that
                understands context and content.
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

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 border border-primary/20">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to get organized?
            </h2>
            <p className="text-muted-foreground mb-6">
             { 'Take your notes with you anywhere, on any device, and access them from any device with an internet connection.' }
            </p>
            <button
              onClick={() => setIsLoggedIn(true)}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Taking Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard untuk user yang sudah login
  const Dashboard = () => (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Your Notes
            </h1>
            <p className="text-muted-foreground">
              Manage and organize your thoughts
            </p>
          </div>

          <button className="mt-4 lg:mt-0 inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl">
            <PlusCircle className="w-5 h-5 mr-2" />
            New Note
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search your notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent">
              <option value="all">All Notes</option>
              <option value="starred">Starred</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="creative">Creative</option>
            </select>
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {searchQuery ? "No notes found" : "No notes yet"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Try adjusting your search terms."
                : "Create your first note to get started!"}
            </p>
            {!searchQuery && (
              <button className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200">
                <PlusCircle className="w-5 h-5 mr-2" />
                Create First Note
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group hover:border-primary/20">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {note.title}
                  </h3>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(note.id);
                      }}
                      className={`p-1 rounded-lg transition-colors ${
                        note.isStarred
                          ? "text-yellow-500 hover:text-yellow-600"
                          : "text-muted-foreground hover:text-primary"
                      }`}>
                      <Star
                        className={`w-4 h-4 ${
                          note.isStarred ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {note.content}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {note.createdAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 text-muted-foreground hover:text-primary transition-colors">
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return isLoggedIn ? <Dashboard /> : <LandingPage />;
};

export default Home;
