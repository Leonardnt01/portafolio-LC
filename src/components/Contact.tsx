import { CheckCircle2, Mail, MapPin, Send } from 'lucide-react';
import { useState, type SyntheticEvent } from 'react';
import SectionHeading from './SectionHeading';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
    window.setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="contact-section reveal-section" id="contact">
      <div className="section-shell contact-layout">
        <div className="contact-copy">
          <SectionHeading title="Hablemos de tu proyecto" />
          <p>
            ¿Tienes una idea en mente, una oportunidad o simplemente quieres conversar sobre
            tecnología? Envíame un mensaje y construyamos algo valioso.
          </p>
          <div className="contact-details">
            <span>
              <Mail size={19} aria-hidden="true" />
              leonardo@ejemplo.com
            </span>
            <span>
              <MapPin size={19} aria-hidden="true" />
              Lima, Perú
            </span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              <span>Nombre completo</span>
              <input name="name" type="text" placeholder="Tu nombre" autoComplete="name" required />
            </label>
            <label>
              <span>Correo electrónico</span>
              <input
                name="email"
                type="email"
                placeholder="hola@ejemplo.com"
                autoComplete="email"
                required
              />
            </label>
          </div>
          <label>
            <span>Asunto</span>
            <input name="subject" type="text" placeholder="¿Cómo puedo ayudarte?" required />
          </label>
          <label>
            <span>Mensaje</span>
            <textarea name="message" placeholder="Escribe tu mensaje aquí..." rows={5} required />
          </label>
          <button className="primary-button" type="submit">
            <Send size={18} aria-hidden="true" />
            Enviar mensaje
          </button>
          <p className={`form-status ${submitted ? 'visible' : ''}`} aria-live="polite">
            <CheckCircle2 size={18} aria-hidden="true" />
            Mensaje preparado. Conecta este formulario a tu servicio de correo cuando estés listo.
          </p>
        </form>
      </div>
    </section>
  );
}
