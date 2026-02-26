# 📖 Hướng dẫn đăng truyện lên CodyMuse

> **CodyMuse** là nền tảng đọc truyện BL · Romance · WLW mã nguồn mở, lưu trữ trực tiếp trên GitHub.  
> Mọi người đều có thể gửi truyện để được đăng lên thư viện chung.

---

## 🌸 Cách gửi truyện — Liên hệ Discord

Hiện tại CodyMuse **nhận truyện qua Discord**. Các bước như sau:

1. Tham gia server Discord của CodyMuse
2. Vào kênh **`#gửi-truyện`**
3. Gửi tin nhắn theo mẫu sau:

```
📚 Tên truyện: [Tên đầy đủ]
✍️  Tác giả: [Tên tác giả / bút danh]
🏷️  Thể loại: [BL / Romance / WLW / Khác]
📝 Mô tả ngắn: [1–3 câu]
📁 File đính kèm: [Đính kèm ZIP hoặc dán link Google Drive]
```

> ⚠️ **Lưu ý:** File ZIP phải theo đúng cấu trúc thư mục bên dưới. Admin sẽ review và upload trong vòng **24–48 giờ**.

---

## 🗂️ Cấu trúc thư mục bắt buộc

Mỗi truyện là một thư mục riêng bên trong `stories/`. Ví dụ truyện có slug `khu-vuon-bi-mat`:

```
stories/
└── khu-vuon-bi-mat/
    ├── meta.json          ← Thông tin truyện (BẮT BUỘC)
    ├── cover.jpg          ← Ảnh bìa (khuyến nghị 500×700px)
    ├── banner.jpg         ← Ảnh banner modal (tuỳ chọn, 1200×400px)
    ├── 001.md             ← Chương 1
    ├── 002.md             ← Chương 2
    └── 003.md             ← Chương 3
```

Và file `index.json` ở thư mục gốc phải được cập nhật thêm entry mới:

```json
[
  { "slug": "khu-vuon-bi-mat", "title": "Khu Vườn Bí Mật" },
  { "slug": "ten-truyen-khac",  "title": "Tên Truyện Khác" }
]
```

---

## 📋 Cú pháp `meta.json` — Chi tiết từng trường

File `meta.json` là **trái tim** của mỗi truyện. Thiếu file này, truyện sẽ không hiển thị được.

### Ví dụ đầy đủ

```json
{
  "title":       "Khu Vườn Bí Mật",
  "author":      "Nguyễn Hoa Lan",
  "status":      "Đang tiến hành",
  "description": "Hai chàng trai tình cờ gặp nhau trong một khu vườn bí ẩn giữa lòng thành phố. Từ hiểu lầm đến yêu thương, hành trình của họ trải qua bao sóng gió...",
  "cover":       "https://raw.githubusercontent.com/CodyMuse/CodyMuse/main/stories/khu-vuon-bi-mat/cover.jpg",
  "banner":      "https://raw.githubusercontent.com/CodyMuse/CodyMuse/main/stories/khu-vuon-bi-mat/banner.jpg",
  "genres":      ["BL", "Romance", "Slice of Life", "Học đường"],
  "chapters": [
    { "no": 1, "title": "Lần Đầu Gặp Gỡ",    "file": "001.md" },
    { "no": 2, "title": "Hiểu Lầm",            "file": "002.md" },
    { "no": 3, "title": "Dưới Tán Cây Anh Đào","file": "003.md" }
  ]
}
```

### Giải thích từng trường

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `title` | `string` | ✅ | Tên truyện hiển thị trên UI |
| `author` | `string` | Khuyến nghị | Tên tác giả hoặc bút danh |
| `status` | `string` | Tuỳ chọn | Trạng thái: `"Hoàn thành"` / `"Đang tiến hành"` / `"Tạm dừng"` |
| `description` | `string` | Khuyến nghị | Tóm tắt ngắn, hiển thị trong modal. Tối đa ~300 ký tự |
| `cover` | `string` (URL) | Khuyến nghị | Link ảnh bìa. Dùng raw GitHub URL |
| `banner` | `string` (URL) | Tuỳ chọn | Ảnh nền modal. Nếu bỏ qua, dùng `cover` làm banner |
| `genres` | `string[]` | Khuyến nghị | Mảng thể loại. Tối đa **10 thể loại** |
| `chapters` | `array` | ✅ | Danh sách chương theo thứ tự |

### Chi tiết trường `chapters`

Mỗi phần tử trong mảng `chapters` gồm:

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| `no` | `number` | ✅ | Số thứ tự chương (1, 2, 3…) |
| `title` | `string` | Khuyến nghị | Tên chương hiển thị. Nếu bỏ qua → hiện `"Chương 1"` |
| `file` | `string` | Khuyến nghị | Tên file `.md`. Nếu bỏ qua → tự động dùng `001.md`, `002.md`… |

> 💡 **Mẹo:** Nếu không đặt `file`, hệ thống tự tìm file theo pattern `001.md`, `002.md`, ... nên hãy **đặt tên file đúng** với số thứ tự có 3 chữ số.

---

## 📝 Quy tắc đặt tên — Slug và File

### Slug (tên thư mục)

Slug là tên thư mục của truyện, xuất hiện trong URL và `index.json`.

**✅ Quy tắc:**
- Chỉ dùng chữ thường `a–z`, số `0–9`, và dấu gạch ngang `-`
- **Không dấu tiếng Việt**, không khoảng trắng, không ký tự đặc biệt
- Ngắn gọn, dễ nhớ, phản ánh tên truyện

**Ví dụ đặt tên slug:**

| Tên truyện | Slug đúng | Slug sai |
|-----------|-----------|----------|
| Khu Vườn Bí Mật | `khu-vuon-bi-mat` | `Khu Vườn Bí Mật` ❌ |
| Ánh Sáng Cuối Đường | `anh-sang-cuoi-duong` | `ánh sáng cuối đường` ❌ |
| My BL Story #1 | `my-bl-story-1` | `my_bl_story#1` ❌ |

### Tên file chương

```
001.md   ← Chương 1
002.md   ← Chương 2
...
099.md   ← Chương 99
100.md   ← Chương 100
```

> ⚠️ Luôn dùng **3 chữ số** có leading zero: `001`, `002`, `010`, `099`…  
> Nếu truyện dài hơn 999 chương (hiếm gặp), dùng 4 chữ số: `0001.md`

---

## ✍️ Cú pháp Markdown viết chương

Mỗi chương là một file `.md`. Dưới đây là hướng dẫn đầy đủ cú pháp được hỗ trợ.

### Cấu trúc mỗi file chương

```markdown
# Chương 1: Lần Đầu Gặp Gỡ

*Gió chiều mang theo mùi hoa nhài thoảng qua khi Minh bước vào khu vườn...*

---

Nội dung chương bắt đầu từ đây. Mỗi đoạn văn cách nhau một dòng trống.

Đây là đoạn văn thứ hai. Văn xuôi bình thường không cần ký hiệu gì đặc biệt.
```

### Tiêu đề

```markdown
# Tiêu đề chương (H1) — dùng cho tên chương

## Tiêu đề phần (H2) — chia chương thành các phần lớn

### Tiêu đề phụ (H3) — tuỳ chọn, dùng ít thôi
```

> 💡 Khuyến nghị: Mỗi file chỉ dùng **một `#` duy nhất** ở đầu làm tên chương.

### Định dạng chữ

```markdown
*In nghiêng* — dùng cho suy nghĩ nội tâm, cảm xúc
**In đậm** — nhấn mạnh, từ quan trọng
***In đậm nghiêng*** — kết hợp cả hai
~~Gạch ngang~~ — xoá bỏ, hồi tưởng
```

**Kết quả:**
- *In nghiêng* — suy nghĩ nội tâm
- **In đậm** — nhấn mạnh  
- ***In đậm nghiêng***
- ~~Gạch ngang~~

### Lời thoại và đối thoại

```markdown
— Anh có ổn không? — Minh hỏi nhỏ, giọng run run.

— Tôi... tôi ổn. — Khải quay mặt đi.

"Nhưng sao mắt anh lại đỏ như vậy?" — Minh thầm nghĩ.
```

> 💡 Dùng dấu `—` (gạch ngang dài) cho lời thoại kiểu văn học Việt Nam, hoặc `"..."` theo kiểu phương Tây. Chọn một kiểu và **giữ nhất quán** trong toàn bộ truyện.

### Phân cảnh và chuyển cảnh

```markdown
Đây là cảnh 1...

---

Đây là cảnh 2, sau khi chuyển thời gian/không gian...
```

Dùng `---` (ba gạch ngang) trên một dòng riêng để tạo đường kẻ phân cách cảnh.

### Trích dẫn / Thư / Nhật ký

```markdown
> *Minh thân mến,*
>
> *Nếu anh đọc được lá thư này, chắc hẳn mọi chuyện đã quá muộn...*
>
> *— Khải*
```

Kết quả hiển thị như một blockquote nổi bật với viền hồng đặc trưng của CodyMuse.

### Ghi chú của tác giả

Nếu muốn thêm ghi chú tác giả (Author's Note), đặt ở **đầu hoặc cuối file**:

```markdown
> 📝 **Ghi chú tác giả:** Chương này được viết lại từ POV của Khải.
> Cảm ơn các bạn đã ủng hộ! ♥

# Chương 5: Bão Tố

Nội dung chương...

---

> 💬 **A/N cuối chương:** Chương tiếp theo sẽ là turning point rồi đó~ 
> Hẹn gặp lại các bạn tuần sau nhé!
```

### Danh sách (dùng hạn chế)

```markdown
Những điều Minh nhớ về anh:

- Nụ cười hay làm người khác bối rối
- Cách anh gõ cửa nhẹ nhàng đến lạ
- Mùi cà phê lúc nào cũng theo anh
```

### Ví dụ file chương hoàn chỉnh

```markdown
# Chương 3: Dưới Tán Cây Anh Đào

*Mùa xuân năm đó, Minh không ngờ rằng một cơn mưa bất chợt lại thay đổi cả cuộc đời mình.*

---

Khu vườn sau giờ tan học vắng lặng hơn thường lệ. Minh thu mình dưới mái hiên nhỏ, nhìn những giọt mưa rơi trên mặt hồ tạo thành vòng tròn lan rộng rồi tan biến.

— Bạn cũng kẹt mưa à?

Giọng nói từ phía sau khiến Minh giật mình. Quay lại, anh thấy một người mình chưa từng gặp — cao hơn mình một cái đầu, tóc hơi ướt, đang cầm một chiếc ô màu xanh dương.

— Tôi... ừ. — Minh gật đầu ngượng ngùng.

Người kia mỉm cười, bước lại gần hơn.

— Tôi là Khải. Học lớp 12A.

*Khải.* Minh lặp lại tên đó trong đầu mà không hiểu tại sao tim mình lại đập nhanh hơn một chút.

---

Mưa tạnh lúc hoàng hôn. Khi Minh bước ra khỏi khu vườn, anh không biết rằng mình đã bỏ quên chiếc tẩy màu xanh — và cũng không biết rằng người tên Khải kia đã cúi xuống nhặt lên, giữ trong túi áo suốt ba tháng sau đó.

> 💬 **A/N:** Chào các bạn~ Cảm ơn đã đọc đến đây! Chương tiếp theo sẽ ra mắt thứ 6 tuần sau. ♥
```

---

## 🏷️ Danh sách thể loại được hỗ trợ

Dùng các thể loại sau trong trường `genres` của `meta.json`:

**Phân loại chính:**
`BL` · `Romance` · `WLW` · `GL` · `Het` · `Bromance`

**Thể loại phụ:**
`Học đường` · `Slice of Life` · `Drama` · `Angst` · `Hurt/Comfort` · `Fluff` · `Comedy` · `Mystery` · `Fantasy` · `Historical` · `Modern` · `Office` · `College` · `Slow Burn` · `Found Family`

**Rating:**
`General` · `Teen` · `Mature`

---

## ❓ Câu hỏi thường gặp

**Q: Tôi có thể đăng truyện dịch không?**  
A: Được, nhưng cần ghi rõ tác giả gốc và nguồn dịch. Đảm bảo bạn có quyền dịch hoặc tác giả gốc đã cho phép.

**Q: File ảnh bìa cần định dạng gì?**  
A: Ưu tiên `.jpg` hoặc `.webp`. Kích thước lý tưởng: **500×700px** (tỉ lệ 5:7). Dung lượng tối đa 500KB.

**Q: Tôi có thể cập nhật/thêm chương sau khi đã đăng không?**  
A: Được. Nhắn tin trong kênh `#cập-nhật-truyện` trên Discord kèm tên truyện và file chương mới.

**Q: Truyện của tôi bị từ chối vì lý do gì?**  
A: Có thể do: sai cú pháp JSON, thiếu file bắt buộc, nội dung vi phạm nội quy, hoặc slug trùng với truyện đã có.

**Q: Slug của tôi có thể thay đổi sau khi đăng không?**  
A: **Không nên.** Slug là định danh cố định. Thay đổi slug sẽ làm mất dữ liệu "Đã lưu" của người đọc.

---

## 📞 Liên hệ & Hỗ trợ

- 💬 **Discord:** [Click here](https://twisk.fun/discord)
- 🐛 **Báo lỗi:** Tạo Issue trên [GitHub CodyMuse](https://github.com/CodyMuse/CodyMuse/issues)
- ✉️ **Email:** *(liên hệ qua Discord để lấy email)*

---

*Tài liệu này được cập nhật lần cuối bởi team CodyMuse. Phiên bản: 1.0*
