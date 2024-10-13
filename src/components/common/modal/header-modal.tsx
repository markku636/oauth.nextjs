import { useAppDispatch } from '@/redux/features/hooks';
import { setHeaderModalView, useSelectUI } from '@/redux/features/ui/ui-slice';
import Overlay from './overlay';

export default function HeaderModal() {
    const dispatch = useAppDispatch();
    const { headerModalView } = useSelectUI();

    if (!headerModalView) {
        return null;
    }

    const onClose = () => {
        dispatch(setHeaderModalView(''));
    };

    return (
        <>
            <div className="hidden lg:block">
                <Overlay onClose={onClose} zIndex={10} fadeIn />;
            </div>
            <div className="lg:hidden">
                <Overlay onClose={onClose} zIndex={30} fadeIn />;
            </div>
        </>
    );
}
