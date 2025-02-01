use aiken/primitive/bytearray

pub fn hex_to_dec(input: ByteArray) -> Int {
  bytearray.foldl(input, 0, fn(byte, acc) { acc * 256 + byte })
}

test hex_to_dec_1() {
  hex_to_dec(#"aa") == 170
}

test hex_to_dec_2() {
  hex_to_dec(#"02") == 2
}

test hex_to_dec_3() {
  hex_to_dec(#"3de2") == 15842
}


