import { useState, useEffect } from 'react';
import { Reveal } from '../components/ui/Reveal';
import { Trash2, Plus, LogOut, Image as ImageIcon } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    size: string;
}

const DEFAULT_PROJECTS: Project[] = [
    { id: 1, title: 'Komponent Lotniczy', category: 'Aerospace', image: '/gallery_print_1.png', size: 'large' },
    { id: 2, title: 'Prototyp Automotive', category: 'Automotive', image: '/gallery_print_2.png', size: 'small' },
    { id: 3, title: 'Instrumentarium Medyczne', category: 'Medycyna', image: '/gallery_print_3.png', size: 'medium' },
    { id: 4, title: 'Uchwyt Robota', category: 'Przemysł', image: '/gallery_print_1.png', size: 'medium' },
    { id: 5, title: 'Obudowa Elektroniki', category: 'Prototyping', image: '/gallery_print_3.png', size: 'small' },
    { id: 6, title: 'Model Architektoniczny', category: 'Architektura', image: '/gallery_print_2.png', size: 'large' },
];

export function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState('');

    // New Project Form
    const [newProject, setNewProject] = useState({
        title: '',
        category: '',
        image: '',
        size: 'medium'
    });

    useEffect(() => {
        const saved = localStorage.getItem('drukmajster_gallery');
        if (saved) {
            setProjects(JSON.parse(saved));
        } else {
            setProjects(DEFAULT_PROJECTS);
            localStorage.setItem('drukmajster_gallery', JSON.stringify(DEFAULT_PROJECTS));
        }

        const auth = localStorage.getItem('drukmajster_auth');
        if (auth === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (login === 'nawrot' && password === 'drukmajster3d') {
            setIsLoggedIn(true);
            localStorage.setItem('drukmajster_auth', 'true');
            setError('');
        } else {
            setError('Błędny login lub hasło');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('drukmajster_auth');
    };

    const deleteProject = (id: number) => {
        const updated = projects.filter(p => p.id !== id);
        setProjects(updated);
        localStorage.setItem('drukmajster_gallery', JSON.stringify(updated));
    };

    const addProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.title || !newProject.image) return;

        const project: Project = {
            ...newProject,
            id: Date.now()
        };

        const updated = [project, ...projects];
        setProjects(updated);
        localStorage.setItem('drukmajster_gallery', JSON.stringify(updated));
        setNewProject({ title: '', category: '', image: '', size: 'medium' });
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-6">
                <Reveal>
                    <div className="bg-white p-8 md:p-12 max-w-md w-full border border-white/10 shadow-2xl">
                        <h2 className="font-sans font-bold text-3xl mb-8 text-black">Panel Admina</h2>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Login</label>
                                <input
                                    type="text"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 py-3 px-4 focus:border-black outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Hasło</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 py-3 px-4 focus:border-black outline-none transition-colors"
                                />
                            </div>
                            {error && <p className="text-red-500 text-xs font-sans">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-4 font-sans font-bold hover:bg-neutral-800 transition-colors uppercase tracking-widest text-xs"
                            >
                                Zaloguj
                            </button>
                        </form>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="mt-6 text-gray-text text-xs font-mono uppercase tracking-widest hover:text-black transition-colors w-full text-center"
                        >
                            Powrót do strony
                        </button>
                    </div>
                </Reveal>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <nav className="border-b border-gray-100 px-6 py-6 flex justify-between items-center sticky top-0 bg-white z-50">
                <div className="flex items-center gap-4">
                    <span className="font-sans font-bold text-xl">DrukMajster Dashboard</span>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 transition-colors">
                    <LogOut size={18} />
                    <span className="font-sans font-medium text-sm">Wyloguj</span>
                </button>
            </nav>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Add New Section */}
                    <div className="lg:col-span-1">
                        <h3 className="font-sans font-bold text-xl mb-8">Dodaj nowe zdjęcie</h3>
                        <form onSubmit={addProject} className="space-y-6">
                            <div>
                                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Tytuł projektu</label>
                                <input
                                    type="text"
                                    placeholder="np. Obudowa sensora"
                                    value={newProject.title}
                                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-100 py-3 px-4 focus:border-black outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Kategoria</label>
                                <input
                                    type="text"
                                    placeholder="np. Automotive"
                                    value={newProject.category}
                                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-100 py-3 px-4 focus:border-black outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-2">URL Zdjęcia / Base64</label>
                                <textarea
                                    rows={4}
                                    placeholder="Wklej URL lub Base64 zdjęcia"
                                    value={newProject.image}
                                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-100 py-3 px-4 focus:border-black outline-none transition-colors resize-none text-xs"
                                />
                            </div>
                            <div>
                                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Rozmiar w siatce</label>
                                <select
                                    value={newProject.size}
                                    onChange={(e) => setNewProject({ ...newProject, size: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-100 py-3 px-4 focus:border-black outline-none transition-colors"
                                >
                                    <option value="small">Mały (Kwadrat)</option>
                                    <option value="medium">Średni (4:3)</option>
                                    <option value="large">Duży (Pionowy 4:5)</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-4 font-sans font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus size={18} />
                                <span>DODAJ DO GALERII</span>
                            </button>
                        </form>
                    </div>

                    {/* List Section */}
                    <div className="lg:col-span-2">
                        <h3 className="font-sans font-bold text-xl mb-8">Twoje realizacje ({projects.length})</h3>
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div key={project.id} className="flex items-center gap-4 p-4 border border-gray-100 hover:border-gray-300 transition-colors">
                                    <div className="w-16 h-16 bg-gray-100 flex-shrink-0">
                                        <img src={project.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-sans font-bold text-sm">{project.title}</h4>
                                        <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{project.category}</p>
                                    </div>
                                    <button
                                        onClick={() => deleteProject(project.id)}
                                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            {projects.length === 0 && (
                                <div className="py-20 text-center border-2 border-dashed border-gray-100">
                                    <ImageIcon className="mx-auto text-gray-200 mb-4" size={48} />
                                    <p className="text-gray-text font-sans">Brak zdjęć w galerii</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
