import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentStory } from '@/store/storySlice';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

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

const difficulties = ["Easy", "Medium", "Hard"];

const storySchema = z.object({
  genre: z.string().nonempty({ message: "Please select a genre" }),
  setting: z.string().nonempty({ message: "Please select a setting" }),
  customCharacter: z.string().optional(),
  customPlotElement: z.string().optional(),
  difficulty: z.string().nonempty({ message: "Please select a difficulty" }),
});

export default function CreateStory() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(storySchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create story');
      }

      const result = await response.json();
      dispatch(setCurrentStory({ ...data, generatedStory: result.story }));
      toast({
        title: "Story created!",
        description: "Your story has been generated successfully.",
      });
    } catch (error) {
      console.error('Error creating story:', error);
      toast({
        title: "Error",
        description: "Failed to create story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Create Your Story</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="genre-select">Select a Genre</Label>
            <Select onValueChange={(value) => register('genre').onChange({ target: { value } })}>
              <SelectTrigger id="genre-select">
                <SelectValue placeholder="Choose a genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
          </div>
          <div>
            <Label htmlFor="setting-select">Select a Setting</Label>
            <Select onValueChange={(value) => register('setting').onChange({ target: { value } })}>
              <SelectTrigger id="setting-select">
                <SelectValue placeholder="Choose a setting" />
              </SelectTrigger>
              <SelectContent>
                {settings.map((setting) => (
                  <SelectItem key={setting} value={setting}>{setting}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.setting && <p className="text-red-500">{errors.setting.message}</p>}
          </div>
          <div>
            <Label htmlFor="difficulty-select">Select Difficulty</Label>
            <Select onValueChange={(value) => register('difficulty').onChange({ target: { value } })}>
              <SelectTrigger id="difficulty-select">
                <SelectValue placeholder="Choose difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty.toLowerCase()}>{difficulty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.difficulty && <p className="text-red-500">{errors.difficulty.message}</p>}
          </div>
          <div>
            <Label htmlFor="custom-character">Custom Character (Optional)</Label>
            <Input
              id="custom-character"
              placeholder="Enter a custom character"
              {...register('customCharacter')}
            />
          </div>
          <div>
            <Label htmlFor="custom-plot">Custom Plot Element (Optional)</Label>
            <Input
              id="custom-plot"
              placeholder="Enter a custom plot element"
              {...register('customPlotElement')}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Story...
              </>
            ) : (
              'Create Story'
            )}
          </Button>
        </form>
      </div>
    </Layout>
  );
}