const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const mysql = require('mysql2/promise');

const app = express();
const port = 8888;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: "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",
  baseURL: "https://integrate.api.nvidia.com/v1",
});

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // sửa nếu bạn có mật khẩu MySQL
  database: 'learnhub'
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (/^(xin chào|hello|hi|chào bạn|chào|xin chào chatbot)$/i.test(message.trim())) {
    return res.json({ response: "Xin chào! 😊 Chào mừng bạn đến với Learn Hub. Bạn cần hỗ trợ thông tin về khóa học, lộ trình học, đăng ký, thanh toán hay ưu đãi nào ạ?" });
  }
  let extraInfo = "";
  let found = false;

  try {
    // Khóa học
    if (/khóa học|course|học gì|danh sách khóa học|có những khóa nào/i.test(message)) {
      const [courses] = await pool.query('SELECT ten_khoa_hoc, mo_ta_ngan FROM loai_khoa_hocs');
      extraInfo = "Các khóa học nổi bật:\n" +
        courses.map(c => `- ${c.ten_khoa_hoc}: ${c.mo_ta_ngan || ''}`).join('\n');
      found = true;
    }
    // Bài học
    else if (/bài học|lesson|nội dung học|học phần/i.test(message)) {
      const [lessons] = await pool.query('SELECT ten_bai_hoc, mo_ta_ngan FROM bai_hocs LIMIT 10');
      extraInfo = "Một số bài học tiêu biểu:\n" +
        lessons.map(l => `- ${l.ten_bai_hoc}: ${l.mo_ta_ngan || ''}`).join('\n');
      found = true;
    }
    // Bài viết
    else if (/bài viết|tin tức|news|article/i.test(message)) {
      const [posts] = await pool.query('SELECT tieu_de, mo_ta_ngan FROM bai_viets LIMIT 5');
      extraInfo = "Một số bài viết mới:\n" +
        posts.map(p => `- ${p.tieu_de}: ${p.mo_ta_ngan || ''}`).join('\n');
      found = true;
    }
    // Học viên
    else if (/học viên|user|khách hàng|student/i.test(message)) {
      const [students] = await pool.query('SELECT ho_ten, email FROM khach_hangs LIMIT 5');
      extraInfo = "Một số học viên tiêu biểu:\n" +
        students.map(s => `- ${s.ho_ten} (${s.email})`).join('\n');
      found = true;
    }
    // Giảng viên/Nhân viên
    else if (/giảng viên|nhân viên|teacher|mentor|staff/i.test(message)) {
      const [teachers] = await pool.query('SELECT ho_ten, email FROM nhan_viens LIMIT 5');
      extraInfo = "Một số giảng viên/nhân viên:\n" +
        teachers.map(t => `- ${t.ho_ten} (${t.email})`).join('\n');
      found = true;
    }
    // Tài chính/giao dịch
    else if (/giao dịch|tài chính|thanh toán|transaction|payment/i.test(message)) {
      const [trans] = await pool.query('SELECT so_tien, noi_dung, created_at FROM tai_chinhs ORDER BY created_at DESC LIMIT 5');
      extraInfo = "Một số giao dịch gần đây:\n" +
        trans.map(t => `- ${t.noi_dung}: ${t.so_tien} VND (${t.created_at})`).join('\n');
      found = true;
    }
    // Phân quyền
    else if (/quyền|phân quyền|role|permission/i.test(message)) {
      const [roles] = await pool.query('SELECT ten_quyen, mo_ta FROM phan_quyens');
      extraInfo = "Các quyền hệ thống:\n" +
        roles.map(r => `- ${r.ten_quyen}: ${r.mo_ta || ''}`).join('\n');
      found = true;
    }
    // Nếu không tìm thấy thông tin liên quan
    if (!found) {
      extraInfo = "Xin lỗi, tôi chỉ có thể hỗ trợ các thông tin về khóa học, bài học, bài viết, học viên, giảng viên, tài chính, phân quyền của Learn Hub. Nếu bạn cần hỗ trợ thêm, vui lòng liên hệ email support@learnhub.com hoặc hotline 0123.456.789 để được tư vấn.";
    }

    const systemPrompt = `
      Bạn là chuyên viên hỗ trợ khách hàng của Learn Hub - nền tảng học lập trình online.
      Chỉ trả lời đúng trọng tâm câu hỏi, không phân tích, không hướng dẫn thêm, không nói về quy trình, không gợi ý, không giải thích lan man.
      Không được trả lời dưới dạng <think> hoặc bất kỳ nhãn nào khác. Chỉ trả lời nội dung chính xác, không được nói về suy nghĩ của mình.
      Trả lời ngắn gọn, chuyên nghiệp, đúng thông tin cần thiết, giống như một chuyên viên thực thụ.
      Nếu không biết, hãy trả lời: "Vui lòng liên hệ bộ phận hỗ trợ qua email support@learnhub.com hoặc hotline 0123.456.789."
      ${extraInfo}
      Luôn trả lời bằng tiếng Việt, tối đa 2-3 câu.
    `;

    const completion = await openai.chat.completions.create({
      model: "deepseek-ai/deepseek-r1",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.6,
      top_p: 0.7,
      max_tokens: 512,
      stream: false,
    });

    if (!completion || !completion.choices || completion.choices.length === 0) {
      return res.status(500).json({ error: "API không trả về phản hồi hợp lệ" });
    }

    // Lọc bỏ các dòng <think> hoặc nhãn không cần thiết
    let reply = completion.choices[0].message.content
      .split('\n')
      .filter(line => !line.trim().startsWith('<think>') && !line.trim().startsWith('Suy nghĩ:') && !line.trim().startsWith('Phân tích:'))
      .join(' ');
    res.json({ response: reply.trim() });
  } catch (error) {
    console.error("Lỗi khi gọi API OpenAI hoặc MySQL:", error);
    res.status(500).json({ error: "Có lỗi xảy ra khi xử lý yêu cầu" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
