import { BackToTopProps } from '@/types/types';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function BackToTop({ scroll }: BackToTopProps): JSX.Element {
  return (
    <>
      {scroll && (
        <a className="scroll-to-top scroll-to-target d-block" href="#top">
          <KeyboardArrowUpIcon />
        </a>
      )}
    </>
  );
}
