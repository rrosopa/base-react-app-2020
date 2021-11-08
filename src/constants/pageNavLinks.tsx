import { ILayoutPageNavLink } from "../components/layout/pageNav";
import { PagePath } from "./pagePath";

export const PageNavLink = {
    user: [
        { path: PagePath.userProfile, title: 'Profile', iconClass: 'bi bi-person-circle' },
        { path: PagePath.userSecurity, title: 'Security', iconClass: 'bi bi-shield-lock' },
        // { path: Path.userSecurity, title: 'Security', iconClass: 'bi bi-shield-lock' },
        // { path: Path.userSecurity, title: 'Security', iconClass: 'bi bi-shield-lock' },
        // { path: Path.userSecurity, title: 'Security', iconClass: 'bi bi-shield-lock' },
        // { path: Path.userSecurity, title: 'Security', iconClass: 'bi bi-shield-lock' },
        // { path: Path.userSecurity, title: 'Security', iconClass: 'bi bi-shield-lock' }
    ] as ILayoutPageNavLink[]
}