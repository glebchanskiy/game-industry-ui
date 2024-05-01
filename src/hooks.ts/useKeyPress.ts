import { useEffect } from "preact/hooks";

export const useKeyPress = (callback: ()=> void, key: string) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === key) {
                callback()
            }
        };

        document.addEventListener('keydown', handleKeyDown, true);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

    }, []);
}