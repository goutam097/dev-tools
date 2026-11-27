export type ImageOutputFormat = "image/jpeg" | "image/png" | "image/webp";

export type ProcessedImage = {
  blob: Blob;
  width: number;
  height: number;
  name: string;
};

const MAX_IMAGE_BYTES = 25 * 1024 * 1024;

export function validateImageFile(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image file.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Images must be 25 MB or smaller.");
  }
}

export async function decodeImage(file: File): Promise<HTMLImageElement> {
  validateImageFile(file);
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("This image could not be decoded."));
      img.src = url;
    });
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function extensionForMime(mime: ImageOutputFormat) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/webp") return "webp";
  return "png";
}

export function outputName(name: string, mime: ImageOutputFormat, suffix: string) {
  const base = name.replace(/\.[^.]+$/, "") || "image";
  return `${base}-${suffix}.${extensionForMime(mime)}`;
}

export async function processImage(
  file: File,
  options: {
    width: number;
    height: number;
    mime: ImageOutputFormat;
    quality: number;
  },
): Promise<ProcessedImage> {
  const image = await decodeImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(options.width));
  canvas.height = Math.max(1, Math.round(options.height));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas processing is not supported by this browser.");

  context.clearRect(0, 0, canvas.width, canvas.height);
  if (options.mime === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => result ? resolve(result) : reject(new Error("The browser could not encode this image.")),
      options.mime,
      options.quality,
    );
  });

  return {
    blob,
    width: canvas.width,
    height: canvas.height,
    name: outputName(file.name, options.mime, "resized"),
  };
}

export async function compressImage(
  file: File,
  quality: number,
  targetBytes?: number,
): Promise<ProcessedImage> {
  const image = await decodeImage(file);
  const mime: ImageOutputFormat =
    file.type === "image/png" ? "image/png" :
    file.type === "image/webp" ? "image/webp" : "image/jpeg";
  const canvas = document.createElement("canvas");
  let width = image.naturalWidth;
  let height = image.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas processing is not supported by this browser.");

  for (let attempt = 0; attempt < 14; attempt += 1) {
    canvas.width = width;
    canvas.height = height;
    if (mime === "image/jpeg") {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
    }
    context.drawImage(image, 0, 0, width, height);

    const bestQualityBlob = await encodeCanvas(canvas, mime, quality);
    if (!targetBytes || bestQualityBlob.size <= targetBytes) {
      return {
        blob: bestQualityBlob,
        width,
        height,
        name: outputName(file.name, mime, "compressed"),
      };
    }

    if (mime !== "image/png") {
      let low = 0.05;
      let high = quality;
      let bestUnderTarget: Blob | undefined;
      const minimumQualityBlob = await encodeCanvas(canvas, mime, low);
      if (minimumQualityBlob.size <= targetBytes) {
        bestUnderTarget = minimumQualityBlob;
        for (let index = 0; index < 8; index += 1) {
          const middle = (low + high) / 2;
          const candidate = await encodeCanvas(canvas, mime, middle);
          if (candidate.size <= targetBytes) {
            low = middle;
            bestUnderTarget = candidate;
          } else {
            high = middle;
          }
        }
      }

      if (bestUnderTarget) {
        return {
          blob: bestUnderTarget,
          width,
          height,
          name: outputName(file.name, mime, "compressed"),
        };
      }
    }

    const currentSize = mime === "image/png"
      ? bestQualityBlob.size
      : (await encodeCanvas(canvas, mime, 0.05)).size;
    const scale = Math.min(0.9, Math.sqrt(targetBytes / currentSize) * 0.9);
    const nextWidth = Math.max(1, Math.floor(width * scale));
    const nextHeight = Math.max(1, Math.floor(height * scale));
    if (nextWidth === width && nextHeight === height) break;
    width = nextWidth;
    height = nextHeight;
  }

  throw new Error("This image could not be reduced below the selected size. Try a larger target size.");
}

function encodeCanvas(canvas: HTMLCanvasElement, mime: ImageOutputFormat, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error("The browser could not encode this image.")),
      mime,
      quality,
    );
  });
}
