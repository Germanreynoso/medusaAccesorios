import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Trash2, Edit2, Upload, Save, X, Package, Database } from 'lucide-react';
import './Admin.css';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'collares',
        image_url: ''
    });
    const [storageFiles, setStorageFiles] = useState([]);
    const [view, setView] = useState('inventory'); // 'inventory' or 'storage'

    useEffect(() => {
        fetchProducts();
        fetchStorageFiles();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchStorageFiles = async () => {
        try {
            const { data, error } = await supabase.storage
                .from('product-images')
                .list('products', {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'name', order: 'desc' },
                });

            if (data) {
                const filesWithUrls = data.map(file => {
                    const { data: { publicUrl } } = supabase.storage
                        .from('product-images')
                        .getPublicUrl(`products/${file.name}`);
                    return { ...file, url: publicUrl };
                });
                setStorageFiles(filesWithUrls);
            }
            if (error) throw error;
        } catch (error) {
            console.error('Error fetching storage files:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
            const filePath = `products/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, image_url: publicUrl }));
            fetchStorageFiles();
        } catch (error) {
            alert('Error al subir la imagen: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                const { error } = await supabase
                    .from('products')
                    .update(formData)
                    .eq('id', editingProduct.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('products')
                    .insert([formData]);
                if (error) throw error;
            }

            setFormData({ name: '', price: '', category: 'collares', image_url: '' });
            setEditingProduct(null);
            fetchProducts();
            alert('Producto guardado correctamente');
        } catch (error) {
            alert('Error al guardar: ' + error.message);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            image_url: product.image_url
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id, imageUrl) => {
        if (!confirm('¿Estás seguro de eliminar este producto y su imagen?')) return;

        try {
            // 1. Eliminar de la base de datos
            const { error: dbError } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (dbError) throw dbError;

            // 2. Eliminar del almacenamiento si es una URL de Supabase
            if (imageUrl && imageUrl.includes('supabase.co')) {
                const parts = imageUrl.split('/');
                const fileName = parts[parts.length - 1];
                if (fileName) {
                    const { error: storageError } = await supabase.storage
                        .from('product-images')
                        .remove([`products/${fileName}`]);

                    if (storageError) console.warn('No se pudo borrar el archivo físico:', storageError.message);
                }
            }

            fetchProducts();
            fetchStorageFiles();
            alert('Producto e imagen eliminados con éxito');
        } catch (error) {
            alert('Error al eliminar: ' + error.message);
        }
    };

    const deleteStorageFile = async (fileName) => {
        if (!confirm('¿Estás seguro de borrar este archivo de imagen? Los productos que la usen dejarán de verla.')) return;

        try {
            const { error } = await supabase.storage
                .from('product-images')
                .remove([`products/${fileName}`]);

            if (error) throw error;
            fetchStorageFiles();
            alert('Imagen eliminada permanentemente del servidor');
        } catch (error) {
            alert('Error al borrar imagen: ' + error.message);
        }
    };


    return (
        <div className="admin-container">
            <header className="admin-header">
                <div>
                    <h1>Panel de Control</h1>
                    <div className="status-badge">Supabase Conectado</div>
                </div>
                <button
                    onClick={() => supabase.auth.signOut()}
                    className="btn-logout"
                    style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }}
                >
                    Cerrar Sesión
                </button>
            </header>

            <div className="admin-tabs">
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                        className={`tab-btn ${view === 'inventory' ? 'active' : ''}`}
                        onClick={() => setView('inventory')}
                    >
                        <Package size={18} /> Inventario
                    </button>
                    <button
                        className={`tab-btn ${view === 'storage' ? 'active' : ''}`}
                        onClick={() => setView('storage')}
                    >
                        <Upload size={18} /> Archivos de Almacenamiento
                    </button>
                </div>

            </div>

            <div className="admin-grid">
                {view === 'inventory' ? (
                    <>
                        {/* Formulario */}
                        <div className="admin-card">
                            <h2>{editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Imagen del Producto</label>
                                    <label className="image-preview">
                                        {formData.image_url ? (
                                            <img src={formData.image_url} alt="Preview" />
                                        ) : (
                                            <div className="placeholder">
                                                <Upload size={32} />
                                                <span>Subir imagen</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                    {uploading && <p>Subiendo imagen...</p>}
                                </div>

                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Collar de Plata..."
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Precio</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="$0.00"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Categoría</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value="collares">Collares</option>
                                        <option value="pulseras">Pulseras</option>
                                        <option value="aros">Aros</option>
                                        <option value="anillos">Anillos</option>
                                        <option value="tobilleras">Tobilleras</option>
                                        <option value="esclavas">Esclavas</option>
                                        <option value="conjuntos">Conjuntos</option>
                                        <option value="sets">Sets</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn-primary" disabled={uploading}>
                                    {editingProduct ? <Save size={20} /> : <Plus size={20} />}
                                    {editingProduct ? 'Guardar Cambios' : 'Añadir Producto'}
                                </button>

                                {editingProduct && (
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={() => {
                                            setEditingProduct(null);
                                            setFormData({ name: '', price: '', category: 'collares', image_url: '' });
                                        }}
                                        style={{ marginTop: '10px', width: '100%', background: '#eee', border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}
                                    >
                                        Cancelar Edición
                                    </button>
                                )}
                            </form>
                        </div>

                        {/* Lista de productos */}
                        <div className="admin-card">
                            <h2>Inventario Actual</h2>
                            {loading ? (
                                <p>Cargando productos...</p>
                            ) : (
                                <div className="products-table-container">
                                    <table className="products-table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Categoría</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                                <tr key={product.id}>
                                                    <td>
                                                        <img src={product.image_url} alt="" className="product-img-mini" />
                                                    </td>
                                                    <td><strong>{product.name}</strong></td>
                                                    <td>{product.price}</td>
                                                    <td><span className="category-tag">{product.category}</span></td>
                                                    <td>
                                                        <div className="action-btns">
                                                            <button className="btn-icon" onClick={() => handleEdit(product)}>
                                                                <Edit2 size={18} />
                                                            </button>
                                                            <button className="btn-icon delete" onClick={() => handleDelete(product.id, product.image_url)}>
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {products.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                                                        <Package size={48} style={{ opacity: 0.2, marginBottom: '10px' }} />
                                                        <p>No hay productos en la base de datos.</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="admin-card full-width">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2>Archivos en el Servidor (Storage)</h2>
                            <button className="btn-secondary" onClick={fetchStorageFiles}>Actualizar Lista</button>
                        </div>
                        <p style={{ marginBottom: '20px', color: '#666' }}>
                            Aquí puedes ver todas las imágenes que has subido. Ten cuidado: si borras una imagen que está siendo usada por un producto, dejará de verse en la web.
                        </p>
                        <div className="storage-grid">
                            {storageFiles.map(file => (
                                <div key={file.id} className="storage-item">
                                    <img src={file.url} alt={file.name} title={file.name} />
                                    <div className="storage-overlay">
                                        <button className="btn-delete-file" onClick={() => deleteStorageFile(file.name)}>
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                    <span className="file-name">{file.name}</span>
                                </div>
                            ))}
                            {storageFiles.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1' }}>
                                    <p>No hay archivos en la carpeta de productos.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
