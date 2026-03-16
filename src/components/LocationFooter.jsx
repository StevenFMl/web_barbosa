import React from 'react';

export default function LocationFooter() {
  return (
    <footer id="ubicacion" className="bg-zinc-900 border-t border-zinc-800 relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Info Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl font-black text-zinc-100 mb-6 tracking-tight">Encuéntranos en <span className="text-red-600">Ibarra</span></h2>
            <p className="text-zinc-400 text-lg sm:text-xl mb-10 leading-relaxed max-w-xl">
              Visítanos para vivir la mejor experiencia de carnes ahumadas y parrilla en la ciudad. El ambiente perfecto, el fuego exacto y el sabor que te hará volver.
            </p>
            
            <div className="space-y-6 mb-10 bg-zinc-950/50 p-6 sm:p-8 rounded-2xl border border-zinc-800">
              <div className="flex items-start group">
                <div className="bg-zinc-800 p-3 rounded-lg group-hover:bg-red-600 transition-colors duration-300">
                  <svg className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-zinc-200 font-bold text-lg mb-1">Ubicación</h3>
                  <p className="text-zinc-400">Av. Mariano Acosta y Gabriela Mistral<br/>Ibarra, Imbabura, EC</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="bg-zinc-800 p-3 rounded-lg group-hover:bg-red-600 transition-colors duration-300">
                  <svg className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-zinc-200 font-bold text-lg mb-1">Horarios de Atención</h3>
                  <p className="text-zinc-400">Jueves a Domingo: 17:00 - 23:00</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-zinc-300 font-bold mb-4 uppercase tracking-widest text-sm">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="h-12 w-12 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="h-12 w-12 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Map iframe */}
          <div className="h-96 lg:h-full min-h-[400px] w-full rounded-3xl overflow-hidden border border-zinc-800 relative z-10 shadow-2xl group hover:border-red-500/50 transition-colors duration-500">
            {/* Replace with actual Goole Maps iframe for Ibarra */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8055139032607!2d-78.1189467!3d0.3540251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2a3c7c4b4d6aab%3A0x6bba847b2c5890e1!2sIbarra%2C%20Ecuador!5e0!3m2!1sen!2sus!4v1709650000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Casa Barbosa"
              className="grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            ></iframe>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Casa Barbosa. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0 font-medium">Hecho para los amantes de la carne.</p>
        </div>
      </div>
    </footer>
  );
}
