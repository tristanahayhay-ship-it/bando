# Bando - 3D World Globe

Ứng dụng web tĩnh hiển thị globe 3D bằng **CesiumJS**, chạy được trên GitHub Pages.

## Chạy local

1. Clone repo.
2. Chạy một static server trong thư mục project, ví dụ:

```bash
python -m http.server 8080
```

3. Mở `http://localhost:8080`.

## Deploy GitHub Pages

Repo đã có workflow: `.github/workflows/pages.yml`.

- Push lên nhánh `main` sẽ tự động deploy lên GitHub Pages qua GitHub Actions.
- Trong GitHub: **Settings → Pages → Build and deployment** chọn **GitHub Actions**.

## Nguồn dữ liệu/asset

- Engine 3D: [CesiumJS](https://cesium.com/platform/cesiumjs/)
- Imagery tiles: [OpenStreetMap](https://www.openstreetmap.org/copyright)
- App này không dùng Google Maps assets.
- Cấu hình hiện tại không yêu cầu API key. Nếu sau này dùng Cesium ion/tiles có key riêng, cần quản lý key qua GitHub Secrets, không hard-code vào mã nguồn.
