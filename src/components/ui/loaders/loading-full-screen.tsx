import Spinner from '@components/ui/loaders/spinner';

export default function LoadingFullScreen() {
    return (
        <div className="fixed left-0 top-0 z-[1000000] flex h-full w-screen items-center justify-center bg-black-coolpc opacity-50">
            <Spinner className="mr-2 mt-1" width="75px" height="75px" color="white" />
        </div>
    );
}
