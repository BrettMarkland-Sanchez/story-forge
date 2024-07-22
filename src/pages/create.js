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

const genres = [
  "Fantasy", "Science Fiction", "Mystery", "Romance", "Thriller", "Horror",
  // ... (rest of the genres)
];

const settings = [
  "Ancient Rome", "Medieval Europe", "Victorian England", "Wild West", "Future Earth",
  // ... (rest of the settings)
];

const storySchema = z.object({
  genre: z.string().nonempty({ message: "Please select a genre" }),
  setting: z.string().nonempty({ message: "Please select a setting" }),
  customCharacter: z.string().optional(),
  customPlotElement: z.string().optional(),
});

export default function CreateStory() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(storySchema)
  });

  const onSubmit = (data) => {
    console.log('Creating story with data:', data);
    dispatch(setCurrentStory(data));
    // TODO: Send data to API
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
          <Button type="submit">
            Create Story
          </Button>
        </form>
      </div>
    </Layout>
  );
}