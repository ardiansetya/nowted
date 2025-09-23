"use client";

import LandingPage from "@/components/ui/landing-page";
import { useGetAllNotes, useUpdateStarNote } from "@/hooks/use-notes";
import { Notes } from "@/types/notes";
import { useClerk } from "@clerk/nextjs";
import {
  Calendar,
  Edit3,
  FileText,
  Filter,
  PlusCircle,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";

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

  const {isSignedIn, user } = useClerk();


  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  // const [notes, setNotes] = useState(mockNotes);

  const { data: notes, isLoading } = useGetAllNotes();
  console.log(notes);

  // Filter notes berdasarkan search dan filter
  const filteredNotes = notes?.notes.filter((note: Notes) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "starred" && note.isStarred) ||
      note.tags.includes(selectedFilter);

    return matchesSearch && matchesFilter;
  });

  const { mutate } = useUpdateStarNote();


  const toggleStar = (noteId: string) => {
    const note = notes?.notes.find((n: Notes) => n.id === noteId);
    if (note) {
      mutate({ id: noteId, isStarred: !note.isStarred });
    }
  };



  

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
        {filteredNotes?.length === 0 ? (
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
            {filteredNotes?.map((note: Notes) => (
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

  return isSignedIn ? <Dashboard /> : <LandingPage />;
};

export default Home;
