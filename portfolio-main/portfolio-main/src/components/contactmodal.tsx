import React, { useState, useEffect } from "react";
import '../css/modal.css';

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    message: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    message?: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [charCount, setCharCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const closeModal = () => {
        onClose();
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            message: ''
        });
        setCharCount(0);
        setShowSuccess(false);
        setErrors({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        if (name === 'message') {
            setCharCount(value.length);
        }
        
        if (name === 'phone') {
            let maskedValue = value.replace(/\D/g, '');
            if (maskedValue.length <= 11) {
                maskedValue = maskedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                maskedValue = maskedValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            }
            setFormData(prev => ({ ...prev, [name]: maskedValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Nome deve ter pelo menos 2 caracteres';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        }

        if (formData.message.trim().length < 10) {
            newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setShowSuccess(true);
            setTimeout(() => {
                closeModal();
            }, 3000);
            
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="modal-overlay active" 
            onClick={handleOverlayClick}
        >
            <div className="modal-container">
                <button className="close-button" onClick={closeModal}>✕</button>
                
                <div className="modal-header">
                    <h2 className="modal-title">Vamos Conversar!</h2>
                    <p className="modal-subtitle">Conte-me sobre seu projeto e como posso ajudar você a torná-lo realidade.</p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="fullName">Nome Completo *</label>
                        <input 
                            type="text" 
                            id="fullName" 
                            name="fullName" 
                            className={`form-input ${errors.fullName ? 'error' : ''}`}
                            placeholder="Seu nome completo"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.fullName && (
                            <div className="error-message">{errors.fullName}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">E-mail *</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className={`form-input ${errors.email ? 'error' : ''}`}
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.email && (
                            <div className="error-message">{errors.email}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="phone">Telefone/WhatsApp</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            className="form-input" 
                            placeholder="(11) 99999-9999"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="message">Descreva seu projeto *</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                            placeholder="Conte-me sobre seu projeto, objetivos, prazo e orçamento. Quanto mais detalhes, melhor poderemos ajudar você!"
                            maxLength={1000}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                        />
                        <div className={`char-counter ${charCount > 900 ? 'warning' : ''} ${charCount >= 1000 ? 'error' : ''}`}>
                            {charCount} / 1000
                        </div>
                        {errors.message && (
                            <div className="error-message">{errors.message}</div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="submit-button" 
                        disabled={isLoading}
                    >
                        {isLoading && <div className="loading-spinner"></div>}
                        <span>{isLoading ? 'Enviando...' : 'Enviar Mensagem'}</span>
                    </button>

                    {showSuccess && (
                        <div className="success-message">
                            <strong>Mensagem enviada com sucesso!</strong><br />
                            Retornarei em breve. Obrigado pelo contato!
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Modal;