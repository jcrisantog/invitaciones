'use client';

interface VideoBackgroundProps {
    videoPath: string; // e.g. '/goku-ultrainstinto/video.mp4'
}

export function VideoBackground({ videoPath }: VideoBackgroundProps) {
    return (
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black">
            <video
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                className="w-full h-full object-cover opacity-60 transition-opacity duration-1000"
                style={{ 
                    filter: 'brightness(0.8) contrast(1.1) saturate(1.2)',
                }}
            >
                <source src={videoPath} type="video/mp4" />
            </video>
            
            {/* Overlay sutil para mejorar legibilidad de textos blancos */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />
            
            {/* Efecto de luz azul/plateada suave en los bordes para el estilo Ultra Instinto */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(59,130,246,0.2)] pointer-events-none" />
        </div>
    );
}
