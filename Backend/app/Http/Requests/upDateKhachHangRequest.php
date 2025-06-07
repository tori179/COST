<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class upDateKhachHangRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
           'id'            => 'required|exists:khach_hangs,id',
           'ho_va_ten'     => 'required|min:3|max:50',
           'email'         => 'required|email|unique:khach_hangs,email,'. $this->id. 'id,',
           'so_dien_thoai' => 'required|digits:10',
           'ngay_sinh'     => 'required|date',
        ];
    }
    public function messages(): array
    {
        return [
            'id.required'               => 'Không tìm thấy khách hàng',
            'id.exists'                 => 'Khách hàng không tồn tại',

            'ho_va_ten.required'        => 'Họ và tên không được để trống.',
            'ho_va_ten.min'             => 'Họ và tên phải có ít nhất 3 ký tự.',
            'ho_va_ten.max'             => 'Họ và tên không được vượt quá 50 ký tự.',

            'email.required'            => 'Email không được để trống.',
            'email.email'               => 'Email không đúng định dạng.',
            'email.unique'              => 'Email đã tồn tại, vui lòng chọn email khác.',

            'so_dien_thoai.required'    => 'Số điện thoại không được để trống',
            'so_dien_thoai.digits'      => 'Số điện thoại phải đủ 10 ký tự',

            'ngay_sinh.required'        => 'Ngày sinh không được để trống',
            'ngay_sinh.date'            => 'Ngày sinh không đúng định dạng',
        ];
    }
}
