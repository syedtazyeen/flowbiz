# FlowBiz

A React-based workflow designer that allows users to create and manage workflows through a drag-and-drop interface. The platform provides a visual canvas where users can connect different nodes to build workflow.

### Key Features

- **Visual Workflow Designer**: Drag-and-drop interface for creating workflows
- **Node-based Architecture**: Connect different types of nodes to build workflows
- **Validation**: Built-in validation to ensure proper workflow structure
- **Modern UI**: Clean interface built with Tailwind CSS
- **Type Safety**: Full TypeScript support for better development experience

## Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **@xyflow/react** - React Flow library for node-based interfaces
- **React Router 7** - Client-side routing
- **Zustand** - Lightweight state management

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd workflow-react
   ```

2. **Install dependencies**
   ```bash
   # Using Bun
   bun install
   
   # Or using npm
   npm install
   ```

3. **Start the development server**
   ```bash
   # Using Bun
   bun dev
   
   # Or using npm
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application


## Project Structure

```
src/
├── components/          # React components
│   ├── features/       # Feature-specific components
│   │   ├── nodes/      # Node type components
│   │   ├── panels/     # Side panels and settings
│   │   └── project/    # Project-related components
│   └── ui/            # Reusable UI components
├── lib/               # Utility functions and constants
├── pages/             # Page components
├── store/             # Zustand state management
├── types/             # TypeScript type definitions
└── routes.ts          # Application routing
```

## Usage

1. **Create a New Workflow**: Click "Get Started" on the home page
2. **Add Nodes**: Drag nodes from the left panel to the canvas
3. **Connect Nodes**: Click and drag from node handles to create connections
4. **Configure Nodes**: Select a node to configure its properties in the right panel
5. **Save Workflow**: Click the save button to validate and save your workflow

## Development

The project uses modern React patterns with:
- Functional components with hooks
- TypeScript for type safety
- Zustand for state management
- Tailwind CSS for styling
- React Flow for the workflow canvas
