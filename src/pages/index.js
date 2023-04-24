// pages/index.js
import { getAllArtworks } from "@/lib/artworks-data";
import Link from "next/link";
import Image from "next/image";

const distributeImagesToColumns = (artworks, columnOrders) => {
  const columns = columnOrders.map((order) =>
    order.map((artworkIndex) => artworks[artworkIndex])
  );
  return columns;
};

export default function Home({ artworks }) {
  const columnOrders = [
    [0, 4, 8, 11],
    [1, 5, 9, 12],
    [2, 6, 13],
    [3, 7, 10, 14],
  ];

  const columns = distributeImagesToColumns(artworks, columnOrders);

  return (
    <div>
      <h1>galleria</h1>
      <main className="gallery">
        {columns.map((column, columnIndex) => (
          <div className="gallery__column" key={`column-${columnIndex}`}>
            {column.map((artwork, innerIndex) => {
              const originalIndex = columnOrders[columnIndex][innerIndex];
              return (
                <div
                  className={`gallery__thumbnail gallery__thumbnail--${originalIndex}`}
                  key={artwork.name}
                >
                  <Image
                    className="gallery__thumbnail-image"
                    src={artwork.images.thumbnail}
                    alt={artwork.name}
                    fill
                  />
                  <h2>
                    <Link href={`/artworks/${originalIndex}`}>
                      {artwork.name}
                    </Link>
                  </h2>
                </div>
              );
            })}
          </div>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const artworks = getAllArtworks();
  return {
    props: {
      artworks,
    },
  };
}
