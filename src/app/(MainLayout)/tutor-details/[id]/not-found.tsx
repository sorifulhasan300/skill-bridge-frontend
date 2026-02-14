export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h2 className="text-2xl font-bold">Tutor Not Found</h2>
      <p className="text-muted-foreground">
        The tutor you are looking for does not exist.
      </p>
    </div>
  );
}
