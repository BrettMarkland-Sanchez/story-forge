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
import { useRouter } from 'next/router';

// ... (keep the existing genres, settings, and difficulties arrays)

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

  // ... (keep the existing return statement with the form)
}