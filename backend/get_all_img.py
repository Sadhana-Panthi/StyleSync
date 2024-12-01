import cloudinary
import cloudinary.api

# Configure Cloudinary
cloudinary.config( 
    cloud_name = "dbhckg5el", 
    api_key = "592613464587995", 
    api_secret = "uk1Ackb_FnPqLbX12ojf65Izct8", 
    secure=True
)

def list_folder_images(folder_name):
    try:
        # Use the Cloudinary Admin API to get resources in the specified folder
        resources = cloudinary.api.resources(
            type="upload", 
            prefix=folder_name,  # Folder name prefix
            max_results=100      # Adjust if needed
        )
        # Extract URLs of images
        urls = [resource['secure_url'] for resource in resources.get('resources', [])]
        return urls
    except cloudinary.exceptions.Error as e:
        print(f"Error fetching folder resources: {e}")
        return []

if __name__ == "__main__":
    folder_name = "models"
    image_urls = list_folder_images(folder_name)

    if image_urls:
        print("Image URLs in folder:")
        for url in image_urls:
            print(url)
    else:
        print("No images found in the folder or an error occurred.")
