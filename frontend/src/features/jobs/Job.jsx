import Button from '../../_components/Button';

const Job = ({ job, searchJobTitle }) => {
  const { _id, title, author, num_pages, text, pdf_link } = job;

  // Silly workaround, but some titles aren't present in the PDFs metadata, so they aren't scraped
  if (!title) return;

  if (
    searchJobTitle &&
    !title.toLowerCase().includes(searchJobTitle.toLowerCase())
  )
    return;

  return (
    <li className="flex flex-col justify-between gap-4 rounded-lg bg-white p-6 shadow-md">
      <h4 className="line-clamp-1">{title}</h4>
      <p className="text-subtle/80 text-sm">ID: {_id}</p>

      <Button className="w-fit" type="primary" link={`/similarity/${_id}`}>
        View Similar Roles
      </Button>
    </li>
  );
};

export default Job;
