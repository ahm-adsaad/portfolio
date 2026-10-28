import { PROJECTS, type Project } from '@/config/projects';

/** 1-based position in `PROJECTS` (config order is chronological). */
export const projectIndex = (project: Project) => PROJECTS.indexOf(project) + 1;

/** `1` -> `01`. */
export const formatIndex = (n: number) => String(n).padStart(2, '0');
