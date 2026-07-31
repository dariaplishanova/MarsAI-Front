import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({ totalPosts, postsPerPage, currentPage, setCurrentPage }: PaginationProps) {
  const { t } = useTranslation();
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentDisplayCount = Math.min(indexOfLastPost, totalPosts);
  const startingDisplayCount = totalPosts === 0 ? 0 : indexOfFirstPost + 1;

  return (
    <div className="mb-8 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
      <p className="text-muted-foreground text-sm font-medium">
        {t('pagination.displaying')}{' '}
        <span className="text-primary font-bold">
          {startingDisplayCount}-{currentDisplayCount}
        </span>{' '}
        {t('pagination.of')} <span className="text-primary font-bold">{totalPosts}</span> {t('pagination.films')} (
        {t('pagination.page')} <span className="text-primary font-bold">{currentPage}</span> {t('pagination.to')}{' '}
        {totalPages})
      </p>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          icon={<ChevronLeft className="h-4 w-4" />}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {t('common.previous')}
        </Button>

        <span className="min-w-7.5 text-center text-sm font-semibold">
          {currentPage}/{totalPages}
        </span>

        <Button
          variant="outline"
          icon={<ChevronRight className="h-4 w-4" />}
          position="right"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
}
