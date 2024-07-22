import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const genres = [
  "Fantasy", "Science Fiction", "Mystery", "Romance", "Thriller", "Horror",
  "Historical Fiction", "Comedy", "Drama", "Adventure", "Dystopian", "Cyberpunk",
  "Steampunk", "Superhero", "Noir", "Fairy Tale", "Urban Fantasy", "Paranormal",
  "Western", "Mythology", "Espionage", "Detective", "Gothic", "Post-Apocalyptic",
  "Magical Realism", "Space Opera", "Military Fiction", "Political Fiction",
  "Psychological Thriller", "Legal Thriller", "Medical Thriller", "Techno-Thriller",
  "Epic Fantasy", "Dark Fantasy", "Science Fantasy", "Crime Fiction", "Action",
  "Slice of Life", "Satire", "Tragedy", "Bildungsroman", "Quest", "Saga", "Fable",
  "Allegory", "Surrealism", "Speculative Fiction", "Time Travel", "Alternate History"
];

const settings = [
  "Ancient Rome", "Medieval Europe", "Victorian England", "Wild West", "Future Earth",
  "Alien Planet", "Cyberpunk City", "Post-Apocalyptic Wasteland", "Haunted House",
  "Pirate Ship", "Mythical Kingdom", "Steampunk Metropolis", "Underwater City",
  "Desert Oasis", "Snow-Covered Mountain Range", "Dense Jungle", "Bustling Space Station",
  "Parallel Universe", "Deep Space Exploration", "Urban Underground", "Small Town America",
  "Dystopian Megacity", "Samurai Japan", "Aztec Empire", "Caribbean Islands",
  "Outer Space Colony", "Ancient Egypt", "Modern Suburbia", "Secret Government Facility",
  "Remote Island", "Fantasy Forest", "Gothic Castle", "Enchanted Village",
  "Dark Alleyways of a Noir City", "Viking Settlement", "Celestial Realm", "High School",
  "Lost Civilization", "Galactic Empire", "Submarine Base", "Dreamscape", "Urban Sprawl",
  "Isolated Research Lab", "Hidden Temple", "Fantasy Marketplace", "Quantum Realm",
  "War-Torn Country", "Enchanted Garden"
];

export default function CreateStory() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSetting, setSelectedSetting] = useState('');
  const [customCharacter, setCustomCharacter] = useState('');
  const [customPlotElement, setCustomPlotElement] = useState('');

  const handleCreateStory = () => {
    // TODO: Implement story creation logic
    console.log('Creating story with genre:', selectedGenre, 'and setting:', selectedSetting);
    console.log('Custom character:', customCharacter);
    console.log('Custom plot element:', customPlotElement);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Create Your Story</h1>
        <div className="space-y-6">
          <div>
            <Label htmlFor="genre-select">Select a Genre</Label>
            <Select onValueChange={setSelectedGenre}>
              <SelectTrigger id="genre-select">
                <SelectValue placeholder="Choose a genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="setting-select">Select a Setting</Label>
            <Select onValueChange={setSelectedSetting}>
              <SelectTrigger id="setting-select">
                <SelectValue placeholder="Choose a setting" />
              </SelectTrigger>
              <SelectContent>
                {settings.map((setting) => (
                  <SelectItem key={setting} value={setting}>{setting}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="custom-character">Custom Character (Optional)</Label>
            <Input
              id="custom-character"
              placeholder="Enter a custom character"
              value={customCharacter}
              onChange={(e) => setCustomCharacter(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="custom-plot">Custom Plot Element (Optional)</Label>
            <Input
              id="custom-plot"
              placeholder="Enter a custom plot element"
              value={customPlotElement}
              onChange={(e) => setCustomPlotElement(e.target.value)}
            />
          </div>
          <Button onClick={handleCreateStory} disabled={!selectedGenre || !selectedSetting}>
            Create Story
          </Button>
        </div>
      </div>
    </Layout>
  );
}