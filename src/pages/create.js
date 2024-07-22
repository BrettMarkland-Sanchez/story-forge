import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentStory } from '@/store/storySlice';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';

const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Horror', 'Adventure'];
const settings = ['Medieval', 'Futuristic', 'Modern', 'Victorian', 'Post-Apocalyptic', 'Ancient'];
const difficulties = ['Easy', 'Medium', 'Hard'];

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
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm({
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
      router.push(`/story/${result.storyId}`);
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
            <Label htmlFor="genre">Select a Genre</Label>
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
          </div>

          <div>
            <Label htmlFor="setting">Select a Setting</Label>
            <Controller
              name="setting"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a setting" />
                  </SelectTrigger>
                  <SelectContent>
                    {settings.map((setting) => (
                      <SelectItem key={setting} value={setting}>{setting}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.setting && <p className="text-red-500 text-sm mt-1">{errors.setting.message}</p>}
          </div>

          <div>
            <Label htmlFor="difficulty">Select Difficulty</Label>
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty.message}</p>}
          </div>

          <div>
            <Label htmlFor="customCharacter">Custom Character (Optional)</Label>
            <Controller
              name="customCharacter"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter a custom character name" />
              )}
            />
          </div>

          <div>
            <Label htmlFor="customPlotElement">Custom Plot Element (Optional)</Label>
            <Controller
              name="customPlotElement"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter a custom plot element" />
              )}
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