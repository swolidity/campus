export default function PageTitle({ children }) {
  return (
    <h1>
      {children}

      <style jsx>{`
        h1 {
          margin-bottom: 28px;
        }
      `}</style>
    </h1>
  );
}
