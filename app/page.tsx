import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">TaskAI</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </nav>

        <main className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">
            Manage Tasks with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              AI-Powered
            </span>{' '}
            Intelligence
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your productivity with AI-driven task management. Get smart suggestions,
            real-time updates, and automated task breakdowns.
          </p>
          <Button size="lg" className="mr-4">
            <Sparkles className="mr-2 h-5 w-5" /> Try for Free
          </Button>
        </main>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <CheckCircle className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Task Management</h3>
            <p className="text-muted-foreground">
              AI-powered task suggestions and automated priority management to keep you focused
              on what matters most.
            </p>
          </Card>
          <Card className="p-6">
            <Sparkles className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Assistance</h3>
            <p className="text-muted-foreground">
              Get intelligent task breakdowns and recommendations powered by advanced AI
              models.
            </p>
          </Card>
          <Card className="p-6">
            <Brain className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-muted-foreground">
              Stay in sync with your team through instant updates and live collaboration
              features.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}