import { useState, useEffect, useRef, useCallback } from 'react';
import { Reveal } from '../components/ui/Reveal';
import { Trash2, Plus, LogOut, Image as ImageIcon, Eye, EyeOff, Upload, GripVertical, Crop } from 'lucide-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Reorder } from "framer-motion";
import Cropper from 'react-easy-crop';
import getCroppedImg from '../lib/cropImage';

interface Project {
    _id: string;
    title: string;
    category: string;
    image: string;
    size: string;
    order?: number;
}

export function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // Convex Mutations
    const verifyPassword = useMutation(api.gallery.verifyPassword);
    const addProjectMutation = useMutation(api.gallery.add);
    const removeProjectMutation = useMutation(api.gallery.remove);
    const updateOrderMutation = useMutation(api.gallery.updateOrder);

    // Data
    const convexProjects = useQuery(api.gallery.get);
    const [localProjects, setLocalProjects] = useState<Project[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    // Sync Query to Local State (for optimistic UI)
    useEffect(() => {
        if (convexProjects && !isDragging) {
            setLocalProjects(convexProjects);
        }
    }, [convexProjects, isDragging]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // New Project Form
    const [newProject, setNewProject] = useState({
        title: '',
        category: '',
        image: '',
        size: 'medium'
    });

    // Cropping State
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isCropping, setIsCropping] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [cropAspect, setCropAspect] = useState(4 / 3);

    const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCropper = () => {
        if (!newProject.image) return;

        // Determine aspect ratio based on size
        let aspect = 4 / 3;
        if (newProject.size === 'small') aspect = 1;
        if (newProject.size === 'large') aspect = 4 / 5;

        setCropAspect(aspect);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        setIsCropping(true);
    };

    const handleCropSave = async () => {
        try {
            if (newProject.image && croppedAreaPixels) {
                const croppedImage = await getCroppedImg(
                    newProject.image,
                    croppedAreaPixels
                );
                if (croppedImage) {
                    setNewProject({ ...newProject, image: croppedImage });
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsCropping(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const isValid = await verifyPassword({ password });
            if (isValid) {
                setIsLoggedIn(true);
            } else {
                setError('Błędne hasło');
            }
        } catch (err) {
            console.error(err);
            setError('Błąd logowania');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setPassword('');
    };

    const deleteProject = async (id: string) => {
        if (!confirm('Czy na pewno chcesz usunąć to zdjęcie?')) return;
        try {
            await removeProjectMutation({ id: id as any, password });
        } catch (err) {
            alert('Błąd usuwania (sprawdź hasło?)');
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProject({ ...newProject, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const addProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.title || !newProject.image) return;

        try {
            await addProjectMutation({
                ...newProject,
                password,
            });
            setNewProject({ title: '', category: '', image: '', size: 'medium' });
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err) {
            console.error(err);
            alert('Błąd dodawania (sprawdź hasło?)');
        }
    };

    const handleReorder = (newOrder: Project[]) => {
        setIsDragging(true);
        setLocalProjects(newOrder);

        const updates = newOrder.map((p, index) => ({
            id: p._id as any,
            order: index
        }));

        updateOrderMutation({ password, projects: updates })
            .catch(err => console.error("Reorder failed", err))
            .finally(() => setIsDragging(false));
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-6">
                <Reveal>
                    <div className="bg-white p-8 md:p-12 max-w-md w-full border border-white/10 shadow-2xl">
                        <h2 className="font-sans font-bold text-3xl mb-8 text-black">Panel Admina</h2>
                        <form onSubmit={handleLogin} className="space-y-6">

                            <div>
                                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Hasło Administratora</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 py-3 px-4 focus:border-black outline-none transition-colors font-sans"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
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

            <div className="max-w-6xl mx-auto px-6 py-12 relative">
                {/* Crop Modal */}
                {isCropping && newProject.image && (
                    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-6">
                        <div className="relative w-full max-w-2xl h-[400px] bg-neutral-900 rounded-xl overflow-hidden mb-6 border border-white/10">
                            <Cropper
                                image={newProject.image}
                                crop={crop}
                                zoom={zoom}
                                aspect={cropAspect}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div className="flex items-center gap-4 w-full max-w-md">
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full accent-white"
                            />
                        </div>
                        <div className="flex items-center gap-4 mt-8">
                            <button
                                onClick={() => setIsCropping(false)}
                                className="bg-transparent border border-white/20 text-white px-6 py-2 rounded-full text-sm hover:bg-white/10 transition-colors"
                            >
                                Anuluj
                            </button>
                            <button
                                onClick={handleCropSave}
                                className="bg-white text-black px-8 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
                            >
                                Zapisz Kadrowanie
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Add New Section */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
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

                                {/* File Upload Area */}
                                <div>
                                    <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Zdjęcie</label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center gap-2 hover:border-black cursor-pointer transition-all bg-gray-50 overflow-hidden relative group"
                                    >
                                        {newProject.image ? (
                                            <>
                                                <img src={newProject.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-10 transition-opacity" />
                                                <ImageIcon className="text-black" size={24} />
                                                <span className="text-xs font-sans text-black font-medium z-10">Zmień plik</span>

                                                {/* Crop Trigger */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); showCropper(); }}
                                                    className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-20"
                                                    title="Kadruj zdjęcie"
                                                >
                                                    <Crop size={16} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="text-gray-400" size={24} />
                                                <span className="text-xs font-sans text-gray-400">Wybierz plik z dysku</span>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>
                                    {newProject.image && <p className="text-[10px] text-gray-400 mt-2 text-center">Kliknij ikonę nożyczek, aby wykadrować zdjęcie.</p>}
                                </div>

                                <div className="py-2 flex items-center gap-4">
                                    <div className="h-px bg-gray-100 flex-grow"></div>
                                    <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">LUB URL</span>
                                    <div className="h-px bg-gray-100 flex-grow"></div>
                                </div>

                                <div>
                                    <textarea
                                        rows={2}
                                        placeholder="Wklej URL zdjęcia"
                                        value={newProject.image.startsWith('data:') ? '' : newProject.image}
                                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 py-3 px-4 focus:border-black outline-none transition-colors resize-none text-xs font-mono"
                                    />
                                </div>

                                <div>
                                    <label className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Rozmiar w siatce</label>
                                    <select
                                        value={newProject.size}
                                        onChange={(e) => setNewProject({ ...newProject, size: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 py-3 px-4 focus:border-black outline-none transition-colors"
                                    >
                                        <option value="small">Mały (Kwadrat 1:1)</option>
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
                    </div>

                    {/* List Section */}
                    <div className="lg:col-span-2">
                        <h3 className="font-sans font-bold text-xl mb-8 flex items-center justify-between">
                            <span>Twoje realizacje ({localProjects.length})</span>
                            <span className="text-xs font-normal text-gray-400">Przeciągnij, aby zmienić kolejność</span>
                        </h3>

                        <Reorder.Group axis="y" values={localProjects} onReorder={handleReorder} className="space-y-4">
                            {localProjects.map((project) => (
                                <Reorder.Item key={project._id} value={project}>
                                    <div className="flex items-center gap-4 p-4 border border-gray-100 bg-white hover:border-gray-300 transition-colors shadow-sm cursor-grab active:cursor-grabbing">
                                        <div className="text-gray-300">
                                            <GripVertical size={20} />
                                        </div>
                                        <div className="w-16 h-16 bg-gray-100 flex-shrink-0">
                                            <img src={project.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-sans font-bold text-sm">{project.title}</h4>
                                            <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{project.category}</p>
                                        </div>
                                        <button
                                            onClick={() => deleteProject(project._id)}
                                            className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>

                        {localProjects.length === 0 && (
                            <div className="py-20 text-center border-2 border-dashed border-gray-100">
                                <ImageIcon className="mx-auto text-gray-200 mb-4" size={48} />
                                <p className="text-gray-text font-sans">Brak zdjęć w galerii</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
