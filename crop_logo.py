from PIL import Image
import sys

def crop_image(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        
        # Get the bounding box of the non-zero regions
        bbox = img.getbbox()
        
        if bbox:
            cropped_img = img.crop(bbox)
            cropped_img.save(output_path)
            print(f"Successfully cropped image. Saved to {output_path}")
        else:
            print("Image is completely empty/transparent.")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    crop_image("public/assets/logo.png", "public/assets/logo.png")
