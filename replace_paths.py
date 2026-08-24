import os
import re

base_dir = r"c:\Users\Somansh\Desktop\New folder\O2Cure"
trust_content = os.path.join(base_dir, "features", "trust", "content.ts")
clientele_content = os.path.join(base_dir, "features", "clientele", "content.ts")

cert_new_dir = os.path.join(base_dir, "public", "certificate_new")
client_new_dir = os.path.join(base_dir, "public", "client_logo_new")

cert_new_files = {f.lower().rsplit('.', 1)[0]: f for f in os.listdir(cert_new_dir) if f.endswith('.webp')}
client_new_files = {f.lower().rsplit('.', 1)[0]: f for f in os.listdir(client_new_dir) if f.endswith('.webp')}

def process_file(filepath, folder_name_old, folder_name_new, new_files_dict):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # regex to find src: "/folder_name_old/filename.ext"
    pattern = re.compile(rf'(/({folder_name_old})/([^/"]+)\.[a-zA-Z0-9]+)')
    
    def replacer(match):
        full_path = match.group(1)
        filename_no_ext = match.group(3).lower()
        if filename_no_ext in new_files_dict:
            return f'/{folder_name_new}/{new_files_dict[filename_no_ext]}'
        # check if there's an exact match despite case
        return full_path

    new_content = pattern.sub(replacer, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

process_file(trust_content, 'certificate', 'certificate_new', cert_new_files)
process_file(clientele_content, 'client_logos', 'client_logo_new', client_new_files)

print("Done replacing paths.")
