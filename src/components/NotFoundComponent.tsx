import Traduction from "../languages/Traduction";
/**
 * This function returns a div with two child divs, one with the text '404' and the other with the text
 * 'Page not found'.
 * @returns A React component.
 */
function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-9xl font-bold">
                {Traduction.NotFoundTraduction.notFound}
            </div>
            <div className="text-2xl font-bold">
                {Traduction.NotFoundTraduction.pageNotFound}
            </div>
        </div>
    );
}
export default NotFound;
