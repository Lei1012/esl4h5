function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

function azList(data, is_en) {

	let arr = []

	let obj_a = {}
	let obj_b = {}
	let obj_c = {}
	let obj_d = {}
	let obj_e = {}
	let obj_f = {}
	let obj_g = {}
	let obj_h = {}
	let obj_i = {}
	let obj_j = {}
	let obj_k = {}
	let obj_l = {}
	let obj_m = {}
	let obj_n = {}
	let obj_o = {}
	let obj_p = {}
	let obj_q = {}
	let obj_r = {}
	let obj_s = {}
	let obj_t = {}
	let obj_u = {}
	let obj_v = {}
	let obj_w = {}
	let obj_x = {}
	let obj_y = {}
	let obj_z = {}

	let obj_a_data = []
	let obj_b_data = []
	let obj_c_data = []
	let obj_d_data = []
	let obj_e_data = []
	let obj_f_data = []
	let obj_g_data = []
	let obj_h_data = []
	let obj_i_data = []
	let obj_j_data = []
	let obj_k_data = []
	let obj_l_data = []
	let obj_m_data = []
	let obj_n_data = []
	let obj_o_data = []
	let obj_p_data = []
	let obj_q_data = []
	let obj_r_data = []
	let obj_s_data = []
	let obj_t_data = []
	let obj_u_data = []
	let obj_v_data = []
	let obj_w_data = []
	let obj_x_data = []
	let obj_y_data = []
	let obj_z_data = []

	data.forEach(item => {
		console.log(item)
		let object_en = item.object_en;
		let object_cn = item.object_cn;
		let object_id = item.id;
		let letter = object_en.substring(0, 1).toLowerCase()
		// console.log(letter)

		if (letter == 'a') {
			obj_a.letter = 'A'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_a_data.push(a)
			obj_a.data = obj_a_data

		}
		if (letter == 'b') {
			obj_b.letter = 'B'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_b_data.push(a)
			obj_b.data = obj_b_data

		}
		if (letter == 'c') {
			obj_c.letter = 'C'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_c_data.push(a)
			obj_c.data = obj_c_data

		}
		if (letter == 'd') {
			obj_d.letter = 'D'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_d_data.push(a)
			obj_d.data = obj_d_data

		}
		if (letter == 'e') {
			obj_e.letter = 'E'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_e_data.push(a)
			obj_e.data = obj_e_data

		}
		if (letter == 'f') {
			obj_f.letter = 'F'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_f_data.push(a)
			obj_f.data = obj_f_data
		}

		if (letter == 'g') {
			obj_g.letter = 'G'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_g_data.push(a)
			obj_g.data = obj_g_data
		}
		if (letter == 'h') {
			obj_h.letter = 'H'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_h_data.push(a)
			obj_h.data = obj_h_data
		}
		if (letter == 'i') {
			obj_i.letter = 'I'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_i_data.push(a)
			obj_i.data = obj_i_data
		}
		if (letter == 'j') {
			obj_j.letter = 'J'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_j_data.push(a)
			obj_j.data = obj_j_data
		}
		if (letter == 'k') {
			obj_k.letter = 'K'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_k_data.push(a)
			obj_k.data = obj_k_data
		}
		if (letter == 'l') {
			obj_l.letter = 'L'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_l_data.push(a)
			obj_l.data = obj_l_data
		}
		if (letter == 'm') {
			obj_m.letter = 'M'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_m_data.push(a)
			obj_m.data = obj_m_data
		}
		if (letter == 'n') {
			obj_n.letter = 'N'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_n_data.push(a)
			obj_n.data = obj_n_data
		}
		if (letter == 'o') {
			obj_o.letter = 'O'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_o_data.push(a)
			obj_o.data = obj_o_data
		}
		if (letter == 'p') {
			obj_p.letter = 'P'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_p_data.push(a)
			obj_p.data = obj_p_data
		}
		if (letter == 'q') {
			obj_q.letter = 'Q'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_q_data.push(a)
			obj_q.data = object_q_data
		}
		if (letter == 'r') {
			obj_r.letter = 'R'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_r_data.push(a)
			obj_r.data = obj_r_data
		}
		if (letter == 's') {
			obj_s.letter = 'S'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_s_data.push(a)
			obj_s.data = obj_s_data
		}
		if (letter == 't') {
			obj_t.letter = 'T'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_t_data.push(a)
			obj_t.data = obj_t_data
		}
		if (letter == 'u') {
			obj_u.letter = 'U'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_u_data.push(a)
			obj_u.data = obj_u_data
		}
		if (letter == 'v') {
			obj_v.letter = 'V'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_v_data.push(a)
			obj_v.data = obj_v_data
		}
		if (letter == 'w') {
			obj_w.letter = 'W'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_w_data.push(a)
			obj_w.data = obj_w_data
		}
		if (letter == 'x') {
			obj_x.letter = 'X'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_x_data.push(a)
			obj_x.data = obj_x_data
		}
		if (letter == 'y') {
			obj_y.letter = 'Y'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_y_data.push(a)
			obj_y.data = obj_y_data
		}
		if (letter == 'z') {
			obj_z.letter = 'Z'
			var a;
			if (is_en) {
				a = {
					id: object_id,
					name: object_en
				}
			} else {
				a = {
					id: object_id,
					name: object_cn
				}
			}

			obj_z_data.push(a)
			obj_z.data = obj_z_data
		}
		// obj.letter = letter;	
	})
	if (Object.keys(obj_a).length !== 0) {
		arr.push(obj_a)
	}
	if (Object.keys(obj_b).length !== 0) {
		arr.push(obj_b)
	}
	if (Object.keys(obj_c).length !== 0) {
		arr.push(obj_c)
	}
	if (Object.keys(obj_d).length !== 0) {
		arr.push(obj_d)
	}
	if (Object.keys(obj_e).length !== 0) {
		arr.push(obj_e)
	}
	if (Object.keys(obj_f).length !== 0) {
		arr.push(obj_f)
	}
	if (Object.keys(obj_g).length !== 0) {
		arr.push(obj_g)
	}
	if (Object.keys(obj_h).length !== 0) {
		arr.push(obj_h)
	}
	if (Object.keys(obj_i).length !== 0) {
		arr.push(obj_i)
	}
	if (Object.keys(obj_j).length !== 0) {
		arr.push(obj_j)
	}
	if (Object.keys(obj_k).length !== 0) {
		arr.push(obj_k)
	}
	if (Object.keys(obj_l).length !== 0) {
		arr.push(obj_l)
	}
	if (Object.keys(obj_m).length !== 0) {
		arr.push(obj_m)
	}
	if (Object.keys(obj_n).length !== 0) {
		arr.push(obj_n)
	}
	if (Object.keys(obj_o).length !== 0) {
		arr.push(obj_o)
	}
	if (Object.keys(obj_p).length !== 0) {
		arr.push(obj_p)
	}
	if (Object.keys(obj_q).length !== 0) {
		arr.push(obj_q)
	}
	if (Object.keys(obj_r).length !== 0) {
		arr.push(obj_r)
	}
	if (Object.keys(obj_s).length !== 0) {
		arr.push(obj_s)
	}
	if (Object.keys(obj_t).length !== 0) {
		arr.push(obj_t)
	}
	if (Object.keys(obj_u).length !== 0) {
		arr.push(obj_u)
	}
	if (Object.keys(obj_v).length !== 0) {
		arr.push(obj_v)
	}
	if (Object.keys(obj_w).length !== 0) {
		arr.push(obj_w)
	}
	if (Object.keys(obj_x).length !== 0) {
		arr.push(obj_x)
	}
	if (Object.keys(obj_y).length !== 0) {
		arr.push(obj_y)
	}
	if (Object.keys(obj_z).length !== 0) {
		arr.push(obj_z)
	}
	

	// console.log(arr)

	return arr;
}

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	azList: azList,

}
