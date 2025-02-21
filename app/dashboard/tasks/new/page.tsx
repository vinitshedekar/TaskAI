'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

interface AISuggestions {
  priority: string;
  dueDate: string;
  steps: Step[];
}

export default function NewTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingSuggestions, setIsGettingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestions | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8081/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          status,
          priority,
          dueDate: new Date(dueDate).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      toast({
        title: 'Success',
        description: 'Task created successfully',
      });

      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create task',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAISuggestions = async () => {
    if (!title || !description) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please provide both title and description',
      });
      return;
    }

    setIsGettingSuggestions(true);

  //   try {
  //     const response = await fetch('http://localhost:8081/api/tasks/suggestions', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ title, description }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to get AI suggestions');
  //     }

  //     const data = await response.json();
  //     const parsedSuggestions = JSON.parse(data.suggestions);
  //     setSuggestions(parsedSuggestions);

  //     // Apply suggestions
  //     setPriority(parsedSuggestions.priority.toLowerCase());
  //     setDueDate(parsedSuggestions.dueDate);

  //     toast({
  //       title: 'AI Suggestions',
  //       description: 'Task suggestions have been applied',
  //     });
  //   } catch (error) {
  //     toast({
  //       variant: 'destructive',
  //       title: 'Error',
  //       description: 'Failed to get AI suggestions',
  //     });
  //   } finally {
  //     setIsGettingSuggestions(false);
  //   }
  // };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:8081/api/tasks/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add JWT to headers
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.status === 401) {
        throw new Error('Invalid or expired authentication token');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const parsedSuggestions = JSON.parse(data.suggestions);
      setSuggestions(parsedSuggestions);

      // Apply suggestions
      setPriority(parsedSuggestions.priority?.toLowerCase());
      setDueDate(parsedSuggestions.dueDate);

      toast({
        title: 'AI Suggestions',
        description: 'Task suggestions have been applied',
      });
    } catch (error) {
      if(error instanceof Error){
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message || 'Failed to get AI suggestions',
        });

        // Optional: Redirect to login if unauthorized
        if (error.message.includes('authentication')) {
          router.push('/login');
        }
      }
      
    } finally {
      setIsGettingSuggestions(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
          <CardDescription>Add a new task to your list</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={getAISuggestions}
              disabled={isGettingSuggestions}
            >
              {isGettingSuggestions ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Get AI Suggestions
            </Button>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            {suggestions && (
              <div className="space-y-4 border rounded-lg p-4 bg-secondary/50">
                <h3 className="font-semibold">Suggested Steps:</h3>
                <ul className="space-y-2">
                  {suggestions.steps.map((step, index) => (
                    <li key={index} className="space-y-1">
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Task'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}